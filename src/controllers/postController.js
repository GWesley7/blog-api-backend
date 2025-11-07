const Post = require('../models/Post');

// Criar novo post
exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const post = new Post({
      title,
      content,
      tags: tags || [],
      author: req.user._id
    });

    await post.save();
    await post.populate('author', 'username email');

    res.status(201).json({
      success: true,
      message: 'Post criado com sucesso',
      data: { post }
    });

  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Listar todos os posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ published: true })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { posts }
    });

  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Obter post específico
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username email');

    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Post não encontrado'
      });
    }

    res.json({
      success: true,
      data: { post }
    });

  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};