#react使用BrowserRouter打包后，刷新页面出现404

    nginx nginx.conf
        server {
            listen 80 default_server;
            server_name /var/www/example.com;

            root /var/www/example.com;
            index index.html index.htm;      

            location ~* \.(?:manifest|appcache|html?|xml|json)$ {
                expires -1;
                # access_log logs/static.log; # I don't usually include a static log
            }

            location ~* \.(?:css|js)$ {
                try_files $uri =404;
                expires 1y;
                access_log off;
                add_header Cache-Control "public";
            }

            # Any route containing a file extension (e.g. /devicesfile.js)
            location ~ ^.+\..+$ {
                try_files $uri =404;
            }

            # Any route that doesn't have a file extension (e.g. /devices)
            location / {
                try_files $uri $uri/ /index.html; #配置修改
            }
        }


# apache 修改httpd.conf
# 如果出现上面的错误，找到 LoadModule rewrite_module 这行， 取消掉前面的注释 conf文件
        <Directory "D:\\apache\\Apache24\\htdocs\\build">
            RewriteEngine on
            # Don't rewrite files or directories
            RewriteCond %{REQUEST_FILENAME} -f [OR]
            RewriteCond %{REQUEST_FILENAME} -d
            RewriteRule ^ - [L]
            # Rewrite everything else to index.html to allow html5 state links
            RewriteRule ^ index.html [L]
        </Directory>