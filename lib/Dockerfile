FROM node:lts-buster

RUN git clone https://github.com/Lexus-X0/ZOOM-MD/ /root/ZOOM-MD

WORKDIR /root/ZOOM-MD

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

RUN npm install


CMD ["node", "index.js"]
