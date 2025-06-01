def includeme(config):
    config.add_route('login', '/api/login')
    config.add_route('register', '/api/register')
    config.add_route('transactions', '/api/transactions')
    config.add_route('transaction_id', '/api/transactions/{id}')
