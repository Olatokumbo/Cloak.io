import { useEffect, useState } from "react";

const useSocialLinks = ({ twitter, facebook, instagram }) => {
  const [twitterUrl, setTwitterUrl] = useState(twitter);
  const [facebookUrl, setFacebookUrl] = useState(facebook);
  const [instagramUrl, setInstagramUrl] = useState(instagram);

  return { twitterUrl, facebookUrl, instagramUrl };
};
