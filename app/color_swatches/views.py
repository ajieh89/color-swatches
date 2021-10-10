import json
import logging

from urllib.parse import parse_qs
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import ColorSwatches

@api_view(['GET'])
def QueryColorSwatches(request):
    try:
        limit = int(request.query_params.get('limit', 5))
        return Response({
            'status': 'Ok',
            'data':  ColorSwatches.generate_color_swatches(limit)
        })
    except Exception as e:
        return (Response({
            'status': 'Error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST))

@api_view(['POST'])
def CreateColorSwatches(request):
    try:
        params = json.loads(request.body);
        logging.debug(type(params.get('properties')));
        color_space = ColorSwatches.objects.create(
            name = params.get('name'),
            properties = json.dumps(params.get('properties'))
        )

        return Response({
            'status': 'Ok',
        })
    except Exception as e:
        return (Response({
            'status': 'Error',
            'message': str(e)
        }, status=status.HTTP_400_BAD_REQUEST))