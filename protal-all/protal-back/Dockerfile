FROM node:20.0.0

WORKDIR /app
COPY . .
ENV PORT=3000


RUN ["npm","install"]
EXPOSE 3000

CMD [ "npm","start" ]