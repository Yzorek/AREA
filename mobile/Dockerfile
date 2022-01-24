FROM androidsdk/android-30:latest

COPY package.json /tmp/package.json
RUN cd /tmp && npm install --no-progress --ignore-optional && npm audit fix

COPY . /usr/src/app/
WORKDIR /usr/src/app/android/

CMD ["./gradlew", "assembleRelease"]
