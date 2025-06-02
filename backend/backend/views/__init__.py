def includeme(config):
    from . import default
    from . import auth
    from . import transaction  # ✅ Harus ada ini
    from . import user

    config.scan('.default')
    config.scan('.auth')
    config.scan('.transaction')  # ✅ Harus discan
    config.scan('.user')
    config.add_static_view(name='static', path='backend:static')