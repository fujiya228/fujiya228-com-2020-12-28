FROM node:14.18.0

RUN wget https://github.com/libvips/libvips/releases/download/v8.12.0/vips-8.12.0.tar.gz
RUN tar xf vips-8.12.0.tar.gz && cd vips-8.12.0 && ./configure && make && make install && ldconfig

WORKDIR /workspace
COPY . /workspace

EXPOSE 8000