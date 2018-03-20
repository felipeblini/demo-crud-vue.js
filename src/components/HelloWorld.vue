<template>
  <div>
    <h1>membros</h1>
    <input type="text" class="busca" @keyup="filtrar()" v-model="keyword">
    <div>
      <a href="#" class="novo" @click.prevent="adicionar()">Novo</a>
    </div>
    <ul>
      <li>
        <div>Nome</div>
        <div>Data</div>
      </li>
      <li v-for="(member, index) in membersList" :key="index">
        <div v-if="member.status === 'editando'">
          <input type="text" ref="editField" class="edit-field" @keyup.enter="atualizar(member, $event)" :value="member.name">
        </div>
        <div v-else>{{ member.name }}</div>
        <div>{{ member.joinedGroupOn }}</div>
        <div>
          <button class="cancel" @click="cancelar(member)" v-if="member.status === 'editando'">Cancelar</button>
          <button class="edit" @click="editar(member)" v-else>Editar</button>
          <button class="danger" @click="excluir(member)">Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import list from "./members";

export default {
  name: "HelloWorld",
  data() {
    return {
      keyword: "",
      members: list,
      membersList: list
    };
  },
  methods: {
    filtrar() {
      console.log("filtrar ", this.keyword);
      if (this.keyword) {
        this.membersList = this.members.filter(
          item => item.name.toLowerCase().indexOf(this.keyword) > -1
        );
      }
    },
    excluir(member) {
      this.membersList = this.members = this.members.filter(
        x => x.name !== member.name
      );
      this.filtrar();
    },
    adicionar() {
      this.keyword = "";
      setTimeout(() => {
        const nome = prompt("Digite o nome");

        // add elements to the beginning of the array
        this.members.unshift({
          name: nome,
          joinedGroupOn: "just now"
        });

        this.membersList = this.members;

        this.filtrar();
      }, 0);
    },
    editar(member, event) {
      this.membersList.forEach((item, i) => {
        if (item.name === member.name) {
          member.status = "editando";
        }
      });

      this.$forceUpdate();
    },
    cancelar(member, event) {
      this.membersList.forEach((item, i) => {
        if (item.name === member.name) {
          member.status = "";
        }
      });

      this.$forceUpdate();
    },
    atualizar(member, event) {
      const name = member.name;

      // input
      const newName = event.target.value;

      this.members.forEach((item, i) => {
        if (item.name === name) {
          this.members[i].name = newName;
          this.members[i].status = "";
        }
      });

      this.membersList = this.members;

      this.$forceUpdate();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

input.busca {
  border: solid 1px #ccc;
  padding: 13px;
  border-radius: 6px;
  width: 50%;
  font-size: 2rem;
  outline: none;
  text-align: center;
  margin-bottom: 45px;
}

input.edit-field {
  border: solid 1px #ccc;
  padding: 3px;
  border-radius: 3px;
  outline: none;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

ul li:nth-child(1) {
  font-weight: bold;
}

ul li div:nth-child(1) {
  width: 30%;
}

ul li div:nth-child(3) {
  flex-grow: 1;
  text-align: right;
}

ul li:nth-child(even) {
  background: #efefef;
}

ul li {
  display: flex;
  padding: 10px;
}

ul li:hover {
  background: #d7f2e6;
}

.danger,
.edit,
.cancel {
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
  outline: none;
}

.danger {
  background: red;
  border: solid 1px red;
}

.danger:hover {
  background: darkred;
  border: solid 1px darkred;
}

.edit {
  background: #428bca;
  border: solid 1px #3071a9;
}

.edit:hover {
  background: #3071a9;
  border: solid 1px #3071a9;
}

.cancel {
  background: #ccc;
  border: solid 1px #ccc;
  color: #333;
}

.cancel:hover {
  background: #efefef;
  border: solid 1px #efefef;
}

a {
  color: #42b983;
}
</style>
