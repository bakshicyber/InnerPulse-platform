import os
from PIL import Image, ImageDraw, ImageFont

# Paths
IMAGE_DIR = r'e:\project\Yoga_Platform\innerpulse-platform\client\public\images\poses'
if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

# Colors (InnerPulse Palette)
DEEP_BLUE = (30, 58, 95)     # #1E3A5F
SAGE_GREEN = (132, 169, 140) # #84A98C
LAVENDER = (205, 180, 219)   # #CDB4DB
PAPER = (248, 250, 249)      # #F8FAF9

# Asanas to generate (from seedAsanas.js)
asanas = [
    {"name": "Child's Pose", "file": "childs_pose.png"},
    {"name": "Downward-Facing Dog", "file": "downward_dog.png"},
    {"name": "Mountain Pose", "file": "mountain_pose.png"},
    {"name": "Tree Pose", "file": "tree_pose.png"},
    {"name": "Warrior I", "file": "warrior_1.png"},
    {"name": "Warrior II", "file": "warrior_2.png"},
    {"name": "Cobra Pose", "file": "cobra_pose.png"},
    {"name": "Plank Pose", "file": "plank_pose.png"},
    {"name": "Chaturanga", "file": "chaturanga.png"},
    {"name": "Upward-Facing Dog", "file": "upward_dog.png"},
    {"name": "Triangle Pose", "file": "triangle_pose.png"},
    {"name": "Bridge Pose", "file": "bridge_pose.png"},
    {"name": "Corpse Pose", "file": "savasana.png"},
    {"name": "Camel Pose", "file": "camel_pose.png"},
    {"name": "Crow Pose", "file": "crow_pose.png"},
    {"name": "Boat Pose", "file": "boat_pose.png"},
    {"name": "Seated Forward Bend", "file": "seated_forward_bend.png"},
    {"name": "Half Lord of the Fishes", "file": "half_lord_fishes.png"},
    {"name": "Headstand", "file": "headstand.png"},
    {"name": "Shoulderstand", "file": "shoulderstand.png"},
    {"name": "Extended Side Angle", "file": "extended_side_angle.png"},
    {"name": "Half Moon Pose", "file": "half_moon.png"},
    {"name": "Dancer Pose", "file": "dancer_pose.png"},
    {"name": "Pigeon Pose", "file": "pigeon_pose.png"},
    {"name": "Lotus Pose", "file": "lotus_pose.png"},
    {"name": "Wheel Pose", "file": "wheel_pose.png"},
    {"name": "Chair Pose", "file": "chair_pose.png"},
    {"name": "Fish Pose", "file": "fish_pose.png"},
    {"name": "Happy Baby Pose", "file": "happy_baby.png"},
    {"name": "Low Lunge", "file": "low_lunge.png"}
]

def generate_placeholder(name, filename):
    width, height = 800, 600
    # Create gradient background (simple vertical)
    image = Image.new('RGB', (width, height), DEEP_BLUE)
    draw = ImageDraw.Draw(image)
    
    # Draw a soft circle/glow in the center
    for r in range(400, 0, -2):
        alpha = int(255 * (1 - r/400) * 0.1)
        color = (
            int(DEEP_BLUE[0] + (SAGE_GREEN[0] - DEEP_BLUE[0]) * (1 - r/400)),
            int(DEEP_BLUE[1] + (SAGE_GREEN[1] - DEEP_BLUE[1]) * (1 - r/400)),
            int(DEEP_BLUE[2] + (SAGE_GREEN[2] - DEEP_BLUE[2]) * (1 - r/400))
        )
        draw.ellipse([width//2 - r, height//2 - r, width//2 + r, height//2 + r], outline=color, width=2)

    # Add text
    try:
        # Try to use a system font
        font = ImageFont.truetype("arial.ttf", 60)
    except:
        font = ImageFont.load_default()
        
    text = name.upper()
    # Get text size
    left, top, right, bottom = draw.textbbox((0, 0), text, font=font)
    text_width = right - left
    text_height = bottom - top
    
    # Draw text shadow
    draw.text(((width - text_width) // 2 + 2, (height - text_height) // 2 + 2), text, font=font, fill=(0,0,0,50))
    # Draw main text
    draw.text(((width - text_width) // 2, (height - text_height) // 2), text, font=font, fill=PAPER)
    
    # Add a border
    draw.rectangle([0, 0, width-1, height-1], outline=SAGE_GREEN, width=2)
    
    # Save
    filepath = os.path.join(IMAGE_DIR, filename)
    image.save(filepath)
    print(f"Generated: {filename}")

# Run for all asanas
for asana in asanas:
    filepath = os.path.join(IMAGE_DIR, asana['file'])
    if not os.path.exists(filepath):
        generate_placeholder(asana['name'], asana['file'])
    else:
        print(f"Skipping: {asana['file']} (already exists)")

print("\nAll missing placeholders generated successfully.")
