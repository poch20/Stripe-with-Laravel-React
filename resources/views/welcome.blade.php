<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <title>Assessment</title>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
  <script src="{{ mix('js/Index.js') }}" defer></script>
<body>
  <div id="root">
  </div>
  @php
  $helloReact = 'Hello React.js from Laravel PHP'
  @endphp

  {{ $helloReact }}
</body>
</html>
