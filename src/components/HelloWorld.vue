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
      <li v-for="(member, index) in members" :key="index">
        <div v-if="member.status === 'editando'">
          <input type="text" ref="editField" class="edit-field" @keyup.enter="editar(member, $event)" :value="member.name">
        </div>
        <div v-else>{{ member.name }}</div>
        <div>{{ member.joinedGroupOn }}</div>
        <div>
          <button class="edit" @click="mudarStatus('editando', member)">Editar</button>
          <button class="danger" @click="excluir(member)">Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import list from "./members";

let membersList = list;

export default {
  name: "HelloWorld",
  data() {
    return {
      keyword: "",
      members: membersList
    };
  },
  methods: {
    filtrar() {
      if (!this.keyword) {
        // sem filtro
        this.members = membersList;
      } else {
        this.members = membersList.filter(
          item => item.name.toLowerCase().indexOf(this.keyword) > -1
        );
      }
    },
    excluir(member) {
      membersList = membersList.filter(x => x.name !== member.name);
      this.filtrar();
    },
    adicionar() {
      this.keyword = "";
      setTimeout(() => {
        const nome = prompt("Digite o nome");
        membersList.unshift({
          name: nome,
          joinedGroupOn: "just now"
        });

        this.filtrar();
      }, 0);
    },
    mudarStatus(status, member, event) {
      membersList.forEach((item, i) => {
        if (item.name === member.name) {
          if (member.status === status) {
            member.status = "";
            return;
          }
          member.status = status;
        } else {
          membersList[i].status = "";
        }
      });

      this.$forceUpdate();
    },
    editar(member, event) {
      const name = member.name;
      const newName = event.target.value;
      membersList.forEach((item, i) => {
        if (item.name === name) {
          membersList[i].name = newName;
          membersList[i].status = "";
        }
      });

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
.edit {
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  padding: 5px 10px;
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

a {
  color: #42b983;
}
</style>
