insert into
    storage.buckets (id, name, public)
values (
        'app-thumbnails',
        'app-thumbnails',
        true
    )
on conflict (id) do nothing;