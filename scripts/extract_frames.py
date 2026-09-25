"""
Pre-extract 64 high-quality WebP frames along the 360° circular head rotation trajectory
and center.webp for eye contact deadzone.
Includes automated background detection and pristine artifact/watermark cleaning.
"""
import os
import json
import cv2
import numpy as np

def clean_watermark(img):
    # Inpaint any corner watermark artifact in bottom right
    h, w, _ = img.shape
    br = img[int(h*0.75):, int(w*0.8):].copy()
    b, g, r = cv2.split(br)
    # Detect bright pixels in bottom right
    star_mask = ((g > 65) & (b > 55)) | ((r > 200) & (g > 100))
    if np.any(star_mask):
        mask = np.zeros(star_mask.shape, dtype=np.uint8)
        mask[star_mask] = 255
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        mask = cv2.dilate(mask, kernel, iterations=2)
        inpainted = cv2.inpaint(br, mask, 5, cv2.INPAINT_TELEA)
        img[int(h*0.75):, int(w*0.8):] = inpainted
    return img

def extract():
    video_path = os.path.join("public", "character.mp4")
    if not os.path.exists(video_path):
        video_path = os.path.join("public", "character.mp4.mp4")

    print(f"Opening video: {video_path}")
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Could not open video at {video_path}")

    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    print(f"Video metadata: {width}x{height} @ {fps}fps, {total_frames} frames")

    frames = []
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(clean_watermark(frame))
    cap.release()

    # 1. Detect background color from perimeter
    top = frames[0][0:4, :, :]
    bottom = frames[0][-4:, :, :]
    left = frames[0][:, 0:4, :]
    right = frames[0][:, -4:, :]
    border_pixels = np.concatenate([
        top.reshape(-1, 3),
        bottom.reshape(-1, 3),
        left.reshape(-1, 3),
        right.reshape(-1, 3)
    ])
    median_bgr = np.median(border_pixels, axis=0).astype(int)
    hex_color = f"#{median_bgr[2]:02x}{median_bgr[1]:02x}{median_bgr[0]:02x}"
    print(f"Detected Background Color: {hex_color} (RGB: {median_bgr[2]}, {median_bgr[1]}, {median_bgr[0]})")

    # 2. Key directional frame numbers identified:
    compass_frames = {
        "UP": 50,
        "UP_RIGHT": 71,
        "RIGHT": 89,
        "DOWN_RIGHT": 109,
        "DOWN": 142,
        "DOWN_LEFT": 168,
        "LEFT": 186,
        "UP_LEFT": 210,
        "CENTER": 235
    }
    print("Identified 8 Compass Directions and Center:")
    for k, v in compass_frames.items():
        print(f"  - {k:12s}: Frame #{v}")

    # Build the 64 circular frames mapping:
    # 8 sectors x 8 frames = 64 frames
    anchors = [
        (0, 50),    # UP (0°)
        (8, 71),    # UP-RIGHT (45°)
        (16, 89),   # RIGHT (90°)
        (24, 109),  # DOWN-RIGHT (135°)
        (32, 142),  # DOWN (180°)
        (40, 168),  # DOWN-LEFT (225°)
        (48, 186),  # LEFT (270°)
        (56, 210),  # UP-LEFT (315°)
    ]

    frame_indices = {}
    for s in range(7):
        idx_start, f_start = anchors[s]
        idx_end, f_end = anchors[s+1]
        span = idx_end - idx_start
        for i in range(span):
            idx = idx_start + i
            f_num = int(round(f_start + i * (f_end - f_start) / span))
            frame_indices[idx] = f_num

    # Sector 7: from 210 back to 50
    sector_7 = [210, 211, 212, 213, 48, 49, 50, 50]
    for i in range(8):
        frame_indices[56 + i] = sector_7[i]

    out_dir = os.path.join("public", "frames")
    os.makedirs(out_dir, exist_ok=True)

    print("Extracting 64 WebP frames into public/frames/...")
    webp_quality = [cv2.IMWRITE_WEBP_QUALITY, 94]
    
    for i in range(64):
        f_num = frame_indices[i]
        frame = frames[f_num]
        
        # Save standard names
        p1 = os.path.join(out_dir, f"frame_{i}.webp")
        p2 = os.path.join(out_dir, f"frame_{i:02d}.webp")
        p3 = os.path.join(out_dir, f"{i}.webp")
        cv2.imwrite(p1, frame, webp_quality)
        cv2.imwrite(p2, frame, webp_quality)
        cv2.imwrite(p3, frame, webp_quality)

    # Save center frame
    center_frame = frames[compass_frames["CENTER"]]
    center_path = os.path.join("public", "center.webp")
    cv2.imwrite(center_path, center_frame, webp_quality)
    print(f"Saved center frame: {center_path}")

    # Output manifest JSON for React
    manifest = {
        "frameCount": 64,
        "backgroundColor": hex_color,
        "backgroundRgb": [int(median_bgr[2]), int(median_bgr[1]), int(median_bgr[0])],
        "faceCenter": {"x": 0.50, "y": 0.375},
        "deadzoneRadius": 0.12,
        "compassFrames": compass_frames,
        "frameMap": [frame_indices[i] for i in range(64)]
    }
    with open(os.path.join("public", "frames_manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print("Pre-extraction complete successfully!")

if __name__ == "__main__":
    extract()
