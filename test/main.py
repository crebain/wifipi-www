from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response
from threading import Timer
import sys


pins = dict(forward = 22, backward = 23, left = 24, right = 25)


try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")
    sys.exit (-1)

GPIO.setmode (GPIO.BCM)

for pin in pins.values():
    print ('Setting up pin %d\n' % pin)
    GPIO.setup (pin, GPIO.OUT, initial=GPIO.LOW)


def createTimer (pin):
    return Timer (.1, GPIO.output, [pin, GPIO.LOW])

def start (direction):
    timers[direction].cancel ()
    pin = pins[direction]
    GPIO.output (pin, GPIO.HIGH)
    timers[direction] = createTimer (pin)
    timers[direction].start ()

timers = dict([(direction, createTimer (pin)) for (direction, pin) in pins.items()])
for timer in timers.values ():
    timer.start ()

directions = dict([(direction, lambda: start (direction)) for direction in pins.keys()])
    

def go(request):
    try:
        direction = request.matchdict['direction']
        start (direction)
        return Response('Go %(direction)s!' % request.matchdict, status=202)
    except KeyError as e:
        return Response('Bad request: %s' % e, status=400)

if __name__ == '__main__':
    config = Configurator()
    config.add_route('go', '/go/{direction}')
    config.add_view(go, route_name='go')
    app = config.make_wsgi_app()
    server = make_server('0.0.0.0', 8080, app)
    server.serve_forever()

