import { CognitoJwtVerifier } from "aws-jwt-verify";

const verifier = CognitoJwtVerifier.create({
  userPoolId: "us-east-1_Um7HlhofP",
  tokenUse: "id",
  clientId: "2i7josdnsh1honiqfpgniq0ruc",
});
  
export const validateToken = async (token) => {
  try {
    const payload = await verifier.verify(token);
    //console.log("Token is valid. Payload:", payload);
    return payload;
  } catch (err) {
    //console.error("Token not valid!", err);
    return null;
  }
}