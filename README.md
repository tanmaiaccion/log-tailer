# log-tailer

cd into directory

docker build . -t log-tailer

docker run -v /home/tanmai/Documents/log-tailer/logs:/usr/src/logs -v /usr/src/app/node_modules -v /home/tanmai/Documents/log-tailer/:/usr/src/app -p 9000:9000 log-tailer

Pending: 
Initial read of file, should start ten lines above EOF.
