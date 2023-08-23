import React, { useState, useEffect } from "react";
import "../../YouTubeVideo/youtubeVideo.css";
import YoutubeEmbed from "../../YouTubeVideo/youtubeVideoEmbed";
import { Box, Grid, CircularProgress } from "@mui/material";
import { Colors } from "../../../../constants/Colors";
import { TagsInput } from "react-tag-input-component";
import "./youtubeVideoSection.css";

export const YouTubeVideoSection = ({ osvalue }) => {
  const [tags, setTags] = useState([]);
  const [videos, setVideos] = useState(osvalue || []);
  const [loading, setLoading] = useState(true);
  console.log("Initial osvalue:", osvalue);
  const videoIdRegex =
    /(?:(?:https?:\/\/)?(?:www\.)?)?youtu(?:\.be\/|be.com\/(?:watch\?(?:.*&)?v=|(?:embed|v)\/))([\w'-]+)/i;
  useEffect(() => {
    if (window.YT && window.YT.Player && Array.isArray(videos)) {
      videos.forEach((video, index) => {
        const match = video.url.match(videoIdRegex);
        const videoId = match ? match[1] : null;
        new window.YT.Player(`player-${index}`, {
          height: '390',
          width: '640',
          videoId: videoId
        });
      });
    }
  }, [videos]);

  //console.log(videos);
  useEffect(() => {
    // Load the IFrame Player API code asynchronously.
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = () => {
      videos.forEach((video, index) => {
        const match = video.url.match(videoIdRegex);
        const videoId = match ? match[1] : null;
        new window.YT.Player(`player-${index}`, {
          height: '390',
          width: '640',
          videoId: videoId
        });
      });
    };

    setVideos(osvalue);
  }, [osvalue]);

  useEffect(() => {
    if (tags.length > 0) {
      const results = osvalue.filter((video) => {
        const isSubset = (videoTags, inputTags) =>
          inputTags.every((inputTag) => videoTags.includes(inputTag));
        return isSubset(video.tags, tags);
      });
      setVideos(results);
    } else {
      setVideos(osvalue);
    }
  }, [tags, osvalue]);


  return (
    <>
      <Box sx={{ margin: "auto", width: "70%" }}>
        <Box
          sx={{
            backgroundColor: "#f0f8ff",
            height: "89%",
            margin: "7",
            width: "95%",
            borderRadius: "1rem",
            padding: "1rem",
            marginTop: "1rem",
            boxShadow: 2,
            position: "relative"
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box component="form">
                <div className="input-tags-wrapper">
                  <TagsInput
                    InputProps={{
                      disableUnderline: true
                    }}
                    type="text"
                    variant="standard"
                    id="search"
                    value={tags}
                    separators={["Enter"]}
                    onChange={setTags}
                    placeHolder="Search Videos"
                  />
                </div>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box sx={{ margin: "auto", width: "70%", marginTop: "2rem" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 5, sm: 8, md: 12 }}
        >
          {videos && videos.length > 0 ? (
            videos.map((video, index) => {
              return (
                <Grid item xs={8} sm={4} md={6} key={video.tags}>
                  <div id={`player-${index}`}></div>
                </Grid>
              );
            })
          ) : (
            <Box
              sx={{
                fontFamily: "Inria Sans",
                color: Colors.primaryColor,
                textAlign: "center",
                fontWeight: "700",
                padding: "2rem",
                fontSize: {
                  md: "2rem",
                  sm: "2.25rem",
                  xs: "1.25rem"
                }
              }}
            >
              No results found
            </Box>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default YouTubeVideoSection;
