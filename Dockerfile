FROM arm32v7/node:8-jessie

RUN mkdir -p /usr/local/work/hiveData

COPY . /usr/local/work/hiveData

WORKDIR /usr/local/work/hiveData

ENTRYPOINT ["node"]
CMD ["index.js"]
