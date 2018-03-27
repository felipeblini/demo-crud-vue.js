<template>
  <div>
    <h1>membros</h1>
    <input type="text" class="busca" v-model="keyword">
    <div>
      <a href="#" class="novo" @click.prevent="adicionar()">Novo</a>
    </div>
    <ul>
      <li>
        <div>Nome</div>
        <div>Data</div>
      </li>
      <li class="lines" v-for="(member, index) in members" :key="index">
        <div class="nome" v-if="member.editando">
          <input type="text" ref="editField" class="edit-field" @keyup.enter="atualizar(member.id, $event.target.value)" :value="member.name">
        </div>
        <div class="nome" v-else>
          <a :href="member.profile" target="_blank">{{ member.name }}</a>
        </div>
        <div class="data">{{ member.date }}</div>
        <div class="actions">
          <button class="cancel" @click="cancelar(member.id)" v-if="member.editando">Cancelar</button>
          <button class="edit" @click="editar(member.id)" v-else>Editar</button>
          <button class="danger" @click="excluir(member)">Excluir</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import list from "./members";

let membersData = [];

export default {
  name: "HelloWorld",
  data() {
    return {
      keyword: "",
      members: []
    };
  },
  methods: {
    listMembers() {
      membersData = list.map(item => {
        return {
          id: new Date().getTime() + Math.random() * 999999,
          ...item
        };
      });

      this.members = membersData;

      console.log(this.members);
    },
    filtrar() {
      this.members = membersData;
      this.members = this.members.filter(
        item => item.name.toLowerCase().indexOf(this.keyword) > -1
      );
    },
    excluir(member) {
      this.members = membersData;
      membersData = this.members = this.members.filter(
        item => item.id !== member.id
      );
      this.filtrar();
    },
    adicionar() {
      this.keyword = "";
      setTimeout(() => {
        const nome = prompt("Digite o nome");
        if (nome) {
          // add elements to the beginning of the array
          this.members.unshift({
            id: new Date().getTime(),
            name: nome,
            date: "just now",
            photo:
              "http://res.cloudinary.com/dwtuxv53y/image/upload/v1519940593/avatar_operqm.gif"
          });
        }
        membersData = this.members;
        this.filtrar();
      }, 0);
    },
    editar(id) {
      membersData.forEach(member => {
        if (member.id === id) {
          member.editando = true;
        }
      });
      this.$forceUpdate();
    },
    cancelar(id) {
      membersData.forEach(member => {
        if (member.id === id) {
          member.editando = false;
        }
      });
      this.$forceUpdate();
    },
    atualizar(id, value) {
      const byId = item => item.id === id;
      let member = this.members.filter(byId)[0];
      member.name = value;
      member.editando = false;
      const updateMember = item => {
        if (item === member) {
          item = member;
        }
      };
      this.members.forEach(updateMember);
      membersData = this.members;
      this.$forceUpdate();
      this.filtrar();
    }
  },
  created() {
    this.listMembers();
  },
  watch: {
    keyword: {
      handler: "filtrar"
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
nav a,
.options a {
  display: inline-block;
  padding: 10px 15px;
}

.options a {
  border: solid #ccc;
  border-radius: 6px;
  text-decoration: none;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;

  li {
    display: flex;
    padding: 10px;
    align-items: center;
  }

  li.header {
    font-weight: bold;

    div:nth-child(1) {
      width: 130px;
    }

    div:nth-child(2) {
      width: 30%;
    }
  }
}

ul li.lines div.img {
  width: 130px;
}
ul li.lines div.img img {
  width: 70px;
}
ul li.lines div.nome {
  width: 30%;
}
ul li.lines div.data {
  flex-grow: 1;
}
ul li.lines:nth-child(even) {
  background: #efefef;
}
ul li.lines:hover {
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

  &:hover {
    background: darkred;
    border: solid 1px darkred;
  }
}

.edit {
  background: #428bca;
  border: solid 1px #3071a9;

  &:hover {
    background: #3071a9;
    border: solid 1px #3071a9;
  }
}

.cancel {
  background: #efefef;
  border: solid 1px #424141;
  color: #333;

  &:hover {
    background: #e4e3e3;
  }
}

a {
  color: #42b983;
}
</style>
