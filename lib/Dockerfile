FROM quay.io/loki-xer/jarvis-md:latest
RUN git clone https://github.com/Lexus-XO/ZOOM-MD /root/ZOOM-MD/
WORKDIR /root/ZOOM-MD/
RUN yarn install --network-concurrency 1
CMD ["npm", "start"]
