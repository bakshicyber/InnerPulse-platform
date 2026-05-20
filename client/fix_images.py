import os
from PIL import Image, ImageDraw, ImageFont

# Ensure poses directory exists
poses_dir = r"E:\project\Yoga_Platform\innerpulse-platform\client\public\images\poses"
os.makedirs(poses_dir, exist_ok=True)

# List of all required poses based on seedFlows.js
required_poses = [
    "childs_pose",
    "cat_cow_pose",
    "downward_dog",
    "savasana",
    "supine_twist",
    "low_lunge",
    "seated_forward_bend",
    "cobra_pose",
    "mountain_pose",
    "tree_pose",
    "warrior_3",
    "eagle_pose"
]

def create_placeholder(filename, display_name):
    # Create an 800x600 image
    # Deep Academic Blue: #1E3A5F
    img = Image.new('RGB', (800, 600), color=(30, 58, 95))
    d = ImageDraw.Draw(img)
    
    # Draw a border (Sage Green #84A98C)
    d.rectangle([20, 20, 780, 580], outline=(132, 169, 140), width=4)
    
    # Draw a generic icon representation (a circle and some lines)
    # Circle for head
    d.ellipse([360, 150, 440, 230], fill=(132, 169, 140))
    # Body line
    d.line([(400, 230), (400, 400)], fill=(132, 169, 140), width=20)
    # Arm line
    d.line([(300, 300), (500, 300)], fill=(132, 169, 140), width=20)
    # Leg line
    d.line([(400, 400), (350, 500)], fill=(132, 169, 140), width=20)
    d.line([(400, 400), (450, 500)], fill=(132, 169, 140), width=20)
    
    # Add text
    try:
        # Try to use a larger font if available on Windows
        font = ImageFont.truetype("arial.ttf", 48)
    except IOError:
        font = ImageFont.load_default()
        
    text = display_name
    
    # Calculate text bounding box
    bbox = d.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    
    # Draw text centered
    d.text(((800 - text_w) / 2, 50), text, fill=(248, 250, 249), font=font) # Soft White
    
    filepath = os.path.join(poses_dir, f"{filename}.png")
    img.save(filepath)
    print(f"Created placeholder: {filepath}")

for pose in required_poses:
    filepath = os.path.join(poses_dir, f"{pose}.png")
    if not os.path.exists(filepath):
        # Format display name: "cat_cow_pose" -> "Cat Cow Pose"
        display_name = " ".join(word.capitalize() for word in pose.split("_"))
        create_placeholder(pose, display_name)
    else:
        print(f"Exists: {filepath}")

print("Image correction complete.")
