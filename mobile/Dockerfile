FROM androidsdk/android-30:latest as dev

RUN apt-get update && \
    apt-get install -yq curl && \
    curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install -y nodejs
 \

COPY ./app/package.json /tmp/package.json
RUN cd /tmp && npm install --no-progress --ignore-optional && npm audit fix

COPY ./app/ /usr/src/app/
WORKDIR /usr/src/app/android/

CMD ["./gradlew", "assembleRelease"]
