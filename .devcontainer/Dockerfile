ARG NODE_VERSION=18
ARG ALPINE_VERSION=3.16
FROM node:$NODE_VERSION-alpine$ALPINE_VERSION AS node

RUN apk update && \
    apk add zsh git vim zsh-autosuggestions zsh-syntax-highlighting bind-tools curl && \
    rm -rf /var/cache/apk/*
RUN sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
RUN echo "source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" >> ~/.zshrc && \
    echo "source /usr/share/zsh/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh" >> ~/.zshrc

# add chromium to image
RUN apk add chromium
RUN apk add git

# set CHROME_BIN environment variable, so that karma knows which crome should be started
ENV CHROME_BIN=/usr/bin/chromium-browser

ENTRYPOINT [ "/bin/zsh" ]