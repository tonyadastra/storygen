import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, Card, CardMedia, CardContent, Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { KeyboardArrowLeft, KeyboardArrowRight, PlayCircle } from "@mui/icons-material";
import api from "./api";

const sampleImages = [
  {
    image: 'https://lh6.googleusercontent.com/BdD6AN1GRBrsTvRguatu_IQhNjnuLUQKh9netlaPuTWSm0dBw8Nu2A4mhkv-1VjJsEWyfdeu4TgreKnTNF8i3skWyXBAhdpIhS0Nu6kaDQYWw19cRo7eCZJvCh373U9hpDTbz3Ng6HmdJ0v77HTlkMw',
    story: "Once upon a time, in a small coastal town, there lived a young and adventurous boy named Jack. Jack was known for his insatiable curiosity and his love for exploration. He had heard tales of hidden treasures buried on a distant island, and he couldn't resist the call of adventure."
  }
]

function App() {
  const [image, setImage] = useState('');
  const [story, setStory] = useState('');
  const [gallery, setGallery] = useState(sampleImages);
  const [index, setIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [loadingVoiceover, setLoadingVoiceover] = useState(false);

  const handleImageUpload = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleVoiceGenerate = async () => {
  }

  const handleStoryGenerate = async () => {
    setLoading(true);
    setErrorMsg('');
    // Call API to generate story
    try {
      await api.post('/story', { image, story });
      setGallery([...gallery, {
        image: image,
        story: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl. Donec auctor, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget nisl.'
      }]);
    }
    catch (err: any) {
      setErrorMsg(err.message);
    }
    finally {
      setLoading(false);
    }
  }

  const nextImage = () => {

    setIndex(index + 1);
  }

  const prevImage = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  }


  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} >
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column' }} gap={3}>
          <Typography variant="h4">Story Generator</Typography>

          <Typography variant="h6">Character</Typography>
          <input type="file" onChange={handleImageUpload} />

          <Typography variant="h6">Story</Typography>
          {/* <TextField select label="Story">
            <option value="story1">Story 1</option>
            <option value="story2">Story 2</option>
          </TextField> */}

          <TextField label="Story" multiline rows={4}
            value={story} onChange={(e) => setStory(e.target.value)} />

          <Button variant="contained" onClick={handleStoryGenerate}>
            Generate Story
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} md={8} >
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column' }} gap={3}>
          {/* {gallery.map((item, index) => ( */}
          <Card key={index}>
            {index >= gallery.length ?
              <CardContent>
                <CardMedia image={"The End"} style={{ height: 500 }} />
                <Typography>THE END</Typography>
              </CardContent>
              :
              <>
                <CardMedia image={gallery[index].image} style={{ height: 500 }} />
                <CardContent>
                  <Typography>{gallery[index].story}</Typography> {/* item.story */}
                </CardContent>
              </>
            }
          </Card>
          {/* ))} */}

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button startIcon={<KeyboardArrowLeft />} onClick={prevImage} disabled={index === 0}>
              Prev
            </Button>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* voiceover */}
              <Button variant="outlined" disabled={loading || index >= gallery.length}
                startIcon={<PlayCircle />} onClick={handleVoiceGenerate}>
                {loading ? 'Generating...' : 'Play'}
              </Button>

              <Button endIcon={<KeyboardArrowRight />} onClick={nextImage} disabled={index >= gallery.length}>
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;