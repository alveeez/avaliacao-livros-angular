import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Livro } from './models/livro';
import { LivroService } from './services/livro.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private readonly livroService = inject(LivroService);

  livros: Livro[] = [];
  livroForm: Livro = this.criarFormularioVazio();
  editando = false;
  mensagem = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';

  ngOnInit(): void {
    this.carregarLivros();
  }

  criarFormularioVazio(): Livro {
    return {
      titulo: '',
      autor: '',
      genero: '',
      anoPublicacao: null
    };
  }

  // GET ALL
  carregarLivros(): void {
    this.livroService.listarTodos().subscribe({
      next: (livros) => {
        this.livros = livros;
      },
      error: (erro) => {
        console.error('Erro no GET ALL:', erro);
        this.mostrarMensagem('Não foi possível conectar à API. Verifique se a API Java está rodando.', 'erro');
      }
    });
  }

  // POST ou PUT
  salvar(): void {
    if (!this.formularioValido()) {
      this.mostrarMensagem('Preencha título, autor, gênero e ano de publicação.', 'erro');
      return;
    }

    if (this.editando && this.livroForm.id !== undefined) {
      // PUT
      this.livroService.atualizar(this.livroForm.id, this.livroForm).subscribe({
        next: () => {
          this.mostrarMensagem('Livro atualizado com sucesso!', 'sucesso');
          this.limparFormulario();
          this.carregarLivros();
        },
        error: (erro) => {
          console.error('Erro no PUT:', erro);
          this.mostrarMensagem('Erro ao atualizar o livro.', 'erro');
        }
      });
      return;
    }

    // POST
    this.livroService.criar(this.livroForm).subscribe({
      next: () => {
        this.mostrarMensagem('Livro cadastrado com sucesso!', 'sucesso');
        this.limparFormulario();
        this.carregarLivros();
      },
      error: (erro) => {
        console.error('Erro no POST:', erro);
        this.mostrarMensagem('Erro ao cadastrar o livro.', 'erro');
      }
    });
  }

  editar(livro: Livro): void {
    this.livroForm = { ...livro };
    this.editando = true;
    this.mensagem = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // DELETE
  deletar(id: number | undefined): void {
    if (id === undefined) return;

    if (!confirm('Tem certeza que deseja apagar este livro?')) {
      return;
    }

    this.livroService.deletar(id).subscribe({
      next: () => {
        this.mostrarMensagem('Livro apagado com sucesso!', 'sucesso');
        this.carregarLivros();
      },
      error: (erro) => {
        console.error('Erro no DELETE:', erro);
        this.mostrarMensagem('Erro ao apagar o livro.', 'erro');
      }
    });
  }

  limparFormulario(): void {
    this.livroForm = this.criarFormularioVazio();
    this.editando = false;
  }

  formularioValido(): boolean {
    return Boolean(
      this.livroForm.titulo.trim() &&
      this.livroForm.autor.trim() &&
      this.livroForm.genero.trim() &&
      this.livroForm.anoPublicacao
    );
  }

  mostrarMensagem(texto: string, tipo: 'sucesso' | 'erro'): void {
    this.mensagem = texto;
    this.tipoMensagem = tipo;
  }
}