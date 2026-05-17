import express from 'express';
import { createServer as createHttpServer } from 'http';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import path from 'path';

async function startServer() {
  const app = express();
  const httpServer = createHttpServer(app);
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  });
  const PORT = 3000;

  // Real-time cursor state
  const users = new Map();

  io.on('connection', (socket) => {
    const colors = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const name = `Guest_${Math.floor(Math.random() * 1000)}`;
    
    const newUser = { id: socket.id, x: -100, y: -100, color, name };
    users.set(socket.id, newUser);

    // Send existing users to the new client
    socket.emit('init-cursors', Array.from(users.values()));
    
    // Tell everyone else about the new user
    socket.broadcast.emit('user-connected', newUser);

    socket.on('cursor-move', (data) => {
      const user = users.get(socket.id);
      if (user) {
        user.x = data.x;
        user.y = data.y;
        socket.broadcast.emit('cursor-update', user);
      }
    });

    socket.on('disconnect', () => {
      users.delete(socket.id);
      io.emit('user-disconnected', socket.id);
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR === 'true' ? false : {
          server: httpServer
        }
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
