from pyramid.view import view_config
from pyramid.response import Response
from backend.models import DBSession
from backend.models.transaction import Transaction
from backend.models.user import User

from ..models import DBSession
from ..models.transaction import Transaction

@view_config(route_name='transactions', renderer='json', request_method='GET')
def get_transactions(request):
    transaksi = DBSession.query(Transaction).all()
    return [
        {
            "id": t.id,
            "user_id": t.user_id,
            "amount": t.amount,
            "category": t.category,
            "description": t.description,
            "timestamp": t.timestamp.isoformat()
        }
        for t in transaksi
    ]

@view_config(route_name='transactions', request_method='POST', renderer='json')
def create_transaction(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return Response(json_body={'error': 'Unauthorized'}, status=401)

    data = request.json_body
    amount = data.get('amount')
    category = data.get('category')
    date = data.get('date')

    t = Transaction(user_id=user_id, amount=amount, category=category, date=date)
    DBSession.add(t)
    DBSession.flush()
    return {'message': 'Transaction added'}

@view_config(route_name='transaction_id', request_method='PUT', renderer='json')
def update_transaction(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return Response(json_body={'error': 'Unauthorized'}, status=401)

    trans_id = int(request.matchdict.get('id'))
    data = request.json_body
    t = DBSession.query(Transaction).filter_by(id=trans_id, user_id=user_id).first()
    if not t:
        return Response(json_body={'error': 'Not found'}, status=404)

    t.amount = data.get('amount', t.amount)
    t.category = data.get('category', t.category)
    t.date = data.get('date', t.date)
    DBSession.flush()
    return {'message': 'Transaction updated'}

@view_config(route_name='transaction_id', request_method='DELETE', renderer='json')
def delete_transaction(request):
    user_id = request.session.get('user_id')
    if not user_id:
        return Response(json_body={'error': 'Unauthorized'}, status=401)

    trans_id = int(request.matchdict.get('id'))
    t = DBSession.query(Transaction).filter_by(id=trans_id, user_id=user_id).first()
    if not t:
        return Response(json_body={'error': 'Not found'}, status=404)

    DBSession.delete(t)
    DBSession.flush()
    return {'message': 'Transaction deleted'}
