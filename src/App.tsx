import React, { useState } from 'react';
import { Button, Grid, Typography, TextField, Card, CardMedia, CardContent, Box } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { KeyboardArrowLeft, KeyboardArrowRight, PlayCircle } from "@mui/icons-material";
import api from "./api";

const sampleImages = [
  {
    image: 'https://lh6.googleusercontent.com/BdD6AN1GRBrsTvRguatu_IQhNjnuLUQKh9netlaPuTWSm0dBw8Nu2A4mhkv-1VjJsEWyfdeu4TgreKnTNF8i3skWyXBAhdpIhS0Nu6kaDQYWw19cRo7eCZJvCh373U9hpDTbz3Ng6HmdJ0v77HTlkMw',
    story: "Once upon a time, in a small coastal town, there lived a young and adventurous boy named Jack. Jack was known for his insatiable curiosity and his love for exploration. He had heard tales of hidden treasures buried on a distant island, and he couldn't resist the call of adventure."
  },
  // {
  //   image: 'https://lh6.googleusercontent.com/O238SQxYHSkilCNfvQ_ZAxDnj5HSOkHV7-8bPpuUEvRtvGAJAWzgUr8mPLwtnQXAxa65wMCGI-bCGsDswch0RDq85bZE8gDSEYPrIXyOflCReF6BUgHzLPoGqS1PnWh5QYWsIOEMD7O4iDa9XRS29AE',
  //   story: ''
  // },
  {
    image: 'https://lh6.googleusercontent.com/qMOua4TktlDRdtODjjM6U9QoMvk_-CO21bHbaQV9jWGO4NvG6Wf30VHol59qN8BTpqOlv0oPfXnvyI45gE54dtqTDRyvabXDvFxwYDR61W1c0LeESpVcyy4JBhtnspsfWhq_7kjzYDGy2kNCHyrO39E',
    story: 'One bright morning, Jack set sail on his trusty boat, the Sea Sprite, determined to uncover the secrets of the fabled island. The winds guided him across the vast ocean, and after a long journey, he arrived at the mysterious shores.    '
  },
  
  
  {
    image: 'https://lh5.googleusercontent.com/yPgmyOQ_Nci2T1NTiA60NX6OVP_QLD-ak9gYhK1BXMBbdnescSSKvyhwafn4FVwT0zi0ziaLF11uZMC-oPNyMxpPsMQgvDT_JLel6bRvEQzXSuG0ZOqT6WjO1nuHFU6LzPMQZxDdktM8q8L46K75KKw',
    story: 'As soon as Jack stepped foot on the island, he felt a sense of excitement and wonder. He followed an old, weathered map he had discovered, leading him through dense jungles, across winding rivers, and up towering cliffs. Along the way, he encountered exotic wildlife, sparkling waterfalls, and breathtaking views that filled him with awe.'
  },
  {
    image: 'https://lh4.googleusercontent.com/Dzetco0LQO17CtaYWe7oTYC2j0wsXlOsfrGdaLRlTVgdagGJjWBrJ8btMRdzO_pFk2jROwicwujecDc8OeQe07hcqAsgOTcFF58Ju91jys_H-0fg_j8sP4EBdIf8n_DOdEd4FxKENQYY15nsES0d3Q8',
    story: 'After days of exploration, Jack stumbled upon a hidden cave. His heart raced with anticipation as he cautiously entered the dark depths.'
  },
  {
    image: 'https://lh3.googleusercontent.com/amOzMgPVmKqLn2mbtPaE2pmnoY45Oq4pFrN8Kq6jcX2S5GrRiY1smTQYNpIAQMfP9jiOMwyNOKf9P46Fj5d79z0MxHiGe0goeh27lmsWQrd_jKR2O-c3t_JkQbZZbHh-52HkerAQRN-v-w_XYr-bFUo',
    story: `The cave revealed a magnificent chamber, illuminated by rays of sunlight streaming through cracks in the ceiling. And there, right before his eyes, lay a trove of glittering treasures—golden coins, shimmering jewels, and ancient artifacts.

    Overwhelmed by the sight, Jack knew he had discovered something truly extraordinary. But he also knew that these treasures held a deeper meaning. They represented the history and stories of those who came before him, and he felt a sense of responsibility to honor their legacy.
    
    Deciding that the treasures belonged to the island, Jack made a solemn promise to protect and preserve them. He carefully documented each artifact, taking notes and sketches, ensuring their stories would be shared with the world.
    `
  },
  // {
  //   image: 'https://lh4.googleusercontent.com/-8cZwBT2Sv7rWXxBrnM-mxenHk181727Bnap1tUDXAyKR6r88DPZQjNONjc_0u1m5zqTe2NVGFSKVSW93l-E-FoGY0WsfdakVnCy6UwIPSbgsfQN9fHaNzjKq5WvjXMq09CEAih-8S-N3h5kID87h2M',
  //   story: ''
  // },
  
  // {
  //   image: 'https://lh4.googleusercontent.com/M0mrZfHfrXKgxrt-RKvx55lnfoehwH-kqZdJLkDNM-3jtyKqgrI0zzkPREXN580jaHtMc0DP30VX2sapDWDXZE7vqF3mwWfLui-YmJdtoaEvkkQ-sjvIxlDsa_Ua2nwLqzTYCPFVSJvq-lXwIOXQ3_I',
  //   story: `In a small town called Sillyville, there lived a mischievous cat named Whiskers. Whiskers was known for his playful antics and his knack for getting into hilarious situations that left everyone laughing.

  //   One sunny day, Whiskers decided to explore the local bakery. The aroma of freshly baked bread and pastries wafted through the air, enticing him with its irresistible scent. Unable to resist, Whiskers snuck inside when no one was looking.
  //   `
  // },
  
]

function App() {


  const [image, setImage] = useState('');
  const [story, setStory] = useState('');
  const [gallery, setGallery] = useState(sampleImages);
  const [index, setIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // const [loadingVoiceover, setLoadingVoiceover] = useState(false);

  const handleImageUpload = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  // const speechHandler = () => {
  //   msg.text = gallery[index].story;
  //   window.speechSynthesis.speak(msg)
  // }
  function setSpeech() {
    return new Promise(
      function (resolve, reject) {
        let synth = window.speechSynthesis;
        let id: any;

        id = setInterval(() => {
          if (synth.getVoices().length !== 0) {
            resolve(synth.getVoices());
            clearInterval(id);
          }
        }, 10);
      }
    )
  }
  const handleVoiceGenerate = () => {
    let s = setSpeech();
    s.then((voices: any) => {
      console.log(voices);
      let msg = new SpeechSynthesisUtterance();
      msg.text = gallery[index].story;
      msg.rate = .9;
      msg.voice = voices[146];
      window.speechSynthesis.speak(msg);
    });
  }

  const handleStoryGenerate = async () => {
    setLoading(true);
    setErrorMsg('');
    // Call API to generate story
    try {
      const res = await api.post('/story', { image, story });
      setGallery(res);
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

          {errorMsg && <Typography color="error">{errorMsg}</Typography>}
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