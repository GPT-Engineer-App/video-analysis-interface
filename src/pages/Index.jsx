import React, { useState, useRef } from "react";
import { Box, Heading, VStack, HStack, Input, Button, Text, Progress, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from "@chakra-ui/react";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";

const Index = () => {
  const [videoSrc, setVideoSrc] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [analysis, setAnalysis] = useState("");
  const videoRef = useRef(null);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setVideoSrc(url);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
    setDuration(video.duration);
  };

  const handleSeek = (value) => {
    const video = videoRef.current;
    video.currentTime = value;
    setCurrentTime(value);
  };

  const handleAnalyze = () => {
    // TODO: Implement video analysis logic here
    setAnalysis("Video analysis results will be displayed here.");
  };

  return (
    <Box maxWidth="800px" margin="auto" padding={8}>
      <Heading as="h1" size="xl" textAlign="center" mb={8}>
        Video Analysis Interface
      </Heading>
      <VStack spacing={8} align="stretch">
        <Input type="file" accept="video/*" onChange={handleVideoUpload} />
        {videoSrc && (
          <Box position="relative">
            <video ref={videoRef} src={videoSrc} onTimeUpdate={handleTimeUpdate} width="100%" />
            <Progress value={(currentTime / duration) * 100} size="sm" colorScheme="blue" position="absolute" bottom={0} left={0} right={0} />
          </Box>
        )}
        <HStack justify="center">
          <Button onClick={() => handleSeek(currentTime - 10)}>
            <FaBackward />
          </Button>
          <Button onClick={togglePlayPause}>{isPlaying ? <FaPause /> : <FaPlay />}</Button>
          <Button onClick={() => handleSeek(currentTime + 10)}>
            <FaForward />
          </Button>
        </HStack>
        <Slider aria-label="video-slider" value={currentTime} min={0} max={duration} onChange={handleSeek}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Button colorScheme="blue" onClick={handleAnalyze}>
          Analyze Video
        </Button>
        {analysis && (
          <Box borderWidth={1} borderRadius="md" p={4}>
            <Text>{analysis}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Index;
