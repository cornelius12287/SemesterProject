<template>
    <div class="card">
      <div class="card-header">
        <h4 class="card-title"v-if="Globals.user">About {{Globals.user.name}}</h4>
        <!--<img v-if="Globals.oAuthId" width="75" :src="`https://graph.facebook.com/${Globals.oAuthId}/picture`"/>
        <img v-if="!Globals.oAuthId" width="75" src="../assets/logo.png" style="filter:invert(1)"/><br>-->
      </div>      
      
      <div class="card-header">
        <h4>{{Globals.user.name}}'s Updates</h4>
      </div>
      <div class="class-body">
          <ul><br>
              <li v-for="update in updates" :key="update.id">
                  <small>{{update.FirstName}} {{update.LastName}} wrote at {{update.created_at}}:</small>&nbsp;&nbsp;&nbsp;&nbsp;
                  <br><br>{{update.UpdateText}}
                  <br>
              </li>
          </ul>
      </div>

      <div class="card-header">
        <h4>{{Globals.user.name}}'s Current Activities</h4>
      </div>
      <div class="class-body">
          <ul><br>
              <li v-for="activity in activities" :key="activity.id">
                  {{activity.Category}}:  {{activity.Motion}}  -  {{activity.Sets}}, {{activity.Reps}}&nbsp;&nbsp;&nbsp;&nbsp;<br>
              </li>
          </ul>
      </div>

      <div class="card-header">
        <h4>{{Globals.user.name}}'s Goals</h4>
      </div>
      <div class="class-body">
          <ul><br>
              <li v-for="goal in goals" :key="goal.id">
                    {{goal.Category}}:  {{goal.Motion}}  -  {{goal.Sets}},  {{goal.Reps}}&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;Achieved?&nbsp;&nbsp;&nbsp;&nbsp;
                    <img v-if="goal.Achieved==1" src="../assets/check.png" height="20px">
                    <br>
                </li>
          </ul>
      </div>

      <div class="card-header">
        <h4>{{Globals.user.name}}'s Friends</h4>
      </div>
      <div class="class-body">
          <ul><br>
              <li v-for="friend in friends" :key="friend.id">
                  {{friend.FriendFirst}} {{friend.FriendLast}}
              </li>
          </ul>
      </div>
</div>
</template>

<script>
import {Globals} from "@/models/api";
import {GetUpdates, GetActivities, GetGoals, GetFriends} from "@/models/users.js";
import toastr from 'toastr';

export default {
  //data: ()=> ({name: "Cory",age: 31})
  data: ()=> ({
      data: {},
      Globals: Globals,
      updates: [],
      activities: [],
      goals: [],
      friends: []
    }),
    async mounted(){
        this.updates = await GetUpdates();
        this.activities = await GetActivities();
        this.goals = await GetGoals();
        this.friends = await GetFriends();
    },
}
</script>

<style type="scss">
</style>
