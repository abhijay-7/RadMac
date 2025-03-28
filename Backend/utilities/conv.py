import subprocess
import os
import ffmpeg

# Function to split audio using ffmpeg
# Function to split audio and update metadata without intermediate file
def process_audio(input_file, start_time, end_time, output_file, metadata):
    # Prepare the metadata fields, ensuring any empty fields are set to "Unknown"
    metadata_command = []
    for key, value in metadata.items():
        if not value:
            value = "Unknown"
        metadata_command.extend(['-metadata', f'{key}={value}'])

    # Create the command to split the audio and add metadata in one step
    command = [
        'ffmpeg',
        '-i', input_file,        # Input file
        '-ss', str(start_time),   # Start time
        '-to', str(end_time),     # End time
        '-c', 'copy',             # Copy codec (no re-encoding)
    ] + metadata_command + [output_file]  # Add metadata and output file

    # Run the command
    subprocess.run(command)


# Split the song based on start and end times and update metadata
def process_song(input_file, splits_metadata):
    for idx, split in enumerate(splits_metadata):
        start_time = split['start']
        end_time = split['end']
        metadata = split['metadata']

        # Generate output file name
        output_file =  split['fname']

        #
        process_audio(
            input_file,
            start_time=start_time,
            end_time=end_time,
            output_file= output_file,
            metadata=metadata
        )
        
        print(f"Processed split {idx + 1}: {output_file}")

# Example usage
if __name__ == '__main__':
    #replace by path to your song from terminal 
    input_song = 'assets/music/Arctic Monkeys - I Wanna Be Yours.mp3'  # Input file path
    splits = [
        {
            'fname': 'sp1.mp3',
            'start': 0, 'end': 60, 
            'metadata': {'title': 'Intro', 'artist': '', 'album': 'Unknown'}
        },
        {
            'fname': 'sp2.mp3',
            'start': 60, 'end': 120, 
            'metadata': {'title': '', 'artist': 'Artist Name', 'album': 'Album Name'}
        }
    ]
    
    process_song(input_song, splits)
