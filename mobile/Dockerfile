FROM androidsdk/android-30:latest as prod

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt-get install nodejs -y

COPY ./myapp/ /home/
WORKDIR /home/

RUN npm install
WORKDIR /home/android/

CMD ["./gradlew", "assembleRelease"]