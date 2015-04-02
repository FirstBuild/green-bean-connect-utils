### mDNS Helper

This is currently work-in-progress. If mdns is running on your Green Bean Connect Kit you will see the service advertised.

OSX (shows specific service name):

```dns-sd -L ChillHub-0ec5e4d0 _http._tcp```

Replace ChillHub-0ec5e4d0 in the above example with what is printed on the label of your GBCK.

Linux (shows all services):

```avahi-browse -t -r _http._tcp```
