FROM quay.io/toxic_kichux/whatskrizai:latest
RUN git clone https://github.com/Lexus-XO/ZOOM-MD/root/ZOOM-MD
WORKDIR /root/ZOOM-MD/
RUN yarn install --network-concurrency 1
CMD ["node", "index.js", "--max_old_space_size=2560"]
