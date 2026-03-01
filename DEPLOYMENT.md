# Deployment Guide

## Local Development (Already Covered in README)

See README.md and QUICKSTART.md for local setup.

## Production Deployment Options

### Option 1: Traditional VPS (DigitalOcean, AWS EC2, etc.)

#### Prerequisites
- Ubuntu 20.04+ server
- Domain name (optional)
- SSH access

#### Steps

1. **Install Node.js and MongoDB**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

2. **Clone and Setup Application**
```bash
# Clone repository
git clone <your-repo-url>
cd smart-emergency-system

# Install dependencies
npm install
cd client && npm install && cd ..

# Setup environment
cp .env.example .env
nano .env  # Edit with production values
```

3. **Build Frontend**
```bash
cd client
npm run build
cd ..
```

4. **Setup PM2 (Process Manager)**
```bash
sudo npm install -g pm2

# Start application
pm2 start server/index.js --name emergency-system
pm2 startup
pm2 save
```

5. **Setup Nginx (Reverse Proxy)**
```bash
sudo apt install -y nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/emergency-system
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/smart-emergency-system/client/dist;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /socket.io {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/emergency-system /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

6. **Setup SSL (Optional but Recommended)**
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

7. **Seed Database**
```bash
node server/seed.js
```

### Option 2: Docker Deployment

#### Create Dockerfile for Backend
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY server ./server

EXPOSE 5000

CMD ["node", "server/index.js"]
```

#### Create Dockerfile for Frontend
```dockerfile
# client/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  mongodb:
    image: mongo:6
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

  backend:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/emergency-system
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - mongodb

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  mongo-data:
```

Run with:
```bash
docker-compose up -d
```

### Option 3: Cloud Platform (Heroku, Railway, Render)

#### Heroku Deployment

1. **Install Heroku CLI**
```bash
npm install -g heroku
heroku login
```

2. **Create Heroku App**
```bash
heroku create emergency-system-app
```

3. **Add MongoDB**
```bash
heroku addons:create mongolab:sandbox
```

4. **Configure Environment**
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git push heroku main
```

6. **Seed Database**
```bash
heroku run node server/seed.js
```

### Option 4: Vercel (Frontend) + Railway (Backend)

#### Frontend on Vercel
1. Connect GitHub repository to Vercel
2. Set build command: `cd client && npm run build`
3. Set output directory: `client/dist`
4. Deploy

#### Backend on Railway
1. Connect GitHub repository to Railway
2. Add MongoDB plugin
3. Set environment variables
4. Deploy

## Environment Variables for Production

```env
PORT=5000
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-very-secure-secret-key-min-32-chars
NODE_ENV=production
```

## Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Use HTTPS in production
- [ ] Enable MongoDB authentication
- [ ] Set up firewall rules
- [ ] Use environment variables for secrets
- [ ] Enable CORS only for your domain
- [ ] Set secure cookie flags
- [ ] Implement rate limiting
- [ ] Regular security updates
- [ ] Database backups configured

## Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs emergency-system
```

### MongoDB Monitoring
```bash
mongo
use emergency-system
db.stats()
db.cases.count()
```

### Nginx Logs
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Backup Strategy

### Database Backup
```bash
# Create backup
mongodump --db emergency-system --out /backup/$(date +%Y%m%d)

# Restore backup
mongorestore --db emergency-system /backup/20240101/emergency-system
```

### Automated Backups (Cron)
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * mongodump --db emergency-system --out /backup/$(date +\%Y\%m\%d)
```

## Scaling Considerations

### Horizontal Scaling
- Use MongoDB Atlas for managed database
- Deploy multiple backend instances behind load balancer
- Use Redis for session management
- Implement sticky sessions for Socket.io

### Vertical Scaling
- Increase server resources (CPU, RAM)
- Optimize database indexes
- Enable MongoDB sharding for large datasets

## Troubleshooting Production Issues

### Application Won't Start
```bash
pm2 logs emergency-system --lines 100
```

### Database Connection Issues
```bash
sudo systemctl status mongod
mongo --eval "db.adminCommand('ping')"
```

### High Memory Usage
```bash
pm2 restart emergency-system
```

### Socket.io Not Working
- Check Nginx WebSocket configuration
- Verify CORS settings
- Check firewall rules

## Performance Optimization

1. **Enable Gzip Compression** (Nginx)
2. **Use CDN** for static assets
3. **Database Indexing**
```javascript
// Add to models
caseSchema.index({ severityScore: -1, createdAt: 1 });
caseSchema.index({ assignedHospital: 1, status: 1 });
```
4. **Implement Caching** (Redis)
5. **Optimize Bundle Size** (code splitting)

## Maintenance

### Update Application
```bash
git pull origin main
npm install
cd client && npm install && npm run build && cd ..
pm2 restart emergency-system
```

### Update Dependencies
```bash
npm update
cd client && npm update && cd ..
```

### Database Maintenance
```bash
mongo
use emergency-system
db.cases.deleteMany({ status: 'completed', createdAt: { $lt: new Date(Date.now() - 90*24*60*60*1000) } })
```

## Support

For issues, check:
1. Application logs: `pm2 logs`
2. MongoDB logs: `/var/log/mongodb/mongod.log`
3. Nginx logs: `/var/log/nginx/error.log`
