import APIRequestBuilder from './APIRequester';
import * as RequestType from './request-type';
import * as ResponseType from './response-type';

class APIService {
  weapon = {
    getList: async (): Promise<ResponseType.ElEquipmentWeapon[]> => {
      return new APIRequestBuilder()
        .url('/api/weapons')
        .get()
        .requestList();
    },
    insert: async (data: RequestType.ElSubmitEquipmentWeapon) => {
      await new APIRequestBuilder()
        .url('/api/weapon')
        .post( data )
        .requestNone();
    },
    getDetail: async (weaponId: number): Promise<ResponseType.ElEquipmentWeapon> => {
      return new APIRequestBuilder()
        .url(`/api/weapon/${weaponId}`)
        .get()
        .requestSingle();
    },
    update: async (weaponId: number, data: RequestType.ElSubmitEquipmentWeapon) => {
      await new APIRequestBuilder()
        .url(`/api/weapon/${weaponId}`)
        .put( data )
        .requestNone();
    },
    delete: async (weaponId: number) => {
      await new APIRequestBuilder()
        .url(`/api/weapon/${weaponId}`)
        .delete()
        .requestNone();
    }
  }

  skill = {
    getList: async (): Promise<ResponseType.ElSkill[]> => {
      return new APIRequestBuilder()
        .url('/api/skill')
        .get()
        .requestList();
    },
    insert: async (data: RequestType.ElSubmitSkill) => {
      await new APIRequestBuilder()
        .url('/api/skill')
        .post( data )
        .requestNone();
    },
    getDetail: async (skillId: number): Promise<ResponseType.ElSkill> => {
      return new APIRequestBuilder()
        .url(`/api/skill/${skillId}`)
        .get()
        .requestSingle();
    },
    update: async (skillId: number, data: RequestType.ElSubmitSkill) => {
      await new APIRequestBuilder()
        .url(`/api/skill/${skillId}`)
        .put( data )
        .requestNone();
    },
    delete: async (skillId: number) => {
      await new APIRequestBuilder()
        .url(`/api/skill/${skillId}`)
        .delete()
        .requestNone();
    }
  }

  magic = {
    getList: async (): Promise<ResponseType.ElMagic[]> => {
      return new APIRequestBuilder()
        .url('/api/magic')
        .get()
        .requestList();
    },
    insert: async (data: RequestType.ElSubmitMagic) => {
      await new APIRequestBuilder()
        .url('/api/magic')
        .post( data )
        .requestNone();
    },
    getDetail: async (magicId: number): Promise<ResponseType.ElMagic> => {
      return new APIRequestBuilder()
        .url(`/api/magic/${magicId}`)
        .get()
        .requestSingle();
    },
    update: async (magicId: number, data: RequestType.ElSubmitMagic) => {
      await new APIRequestBuilder()
        .url(`/api/magic/${magicId}`)
        .put( data )
        .requestNone();
    },
    delete: async (magicId: number) => {
      await new APIRequestBuilder()
        .url(`/api/magic/${magicId}`)
        .delete()
        .requestNone();
    }
  }

  pray = {
    getList: async (): Promise<ResponseType.ElPray[]> => {
      return new APIRequestBuilder()
        .url('/api/pray')
        .get()
        .requestList();
    },
    insert: async (data: RequestType.ElSubmitPray) => {
      await new APIRequestBuilder()
        .url('/api/pray')
        .post( data )
        .requestNone();
    },
    getDetail: async (prayId: number): Promise<ResponseType.ElPray> => {
      return new APIRequestBuilder()
        .url(`/api/pray/${prayId}`)
        .get()
        .requestSingle();
    },
    update: async (prayId: number, data: RequestType.ElSubmitPray) => {
      await new APIRequestBuilder()
        .url(`/api/pray/${prayId}`)
        .put( data )
        .requestNone();
    },
    delete: async (prayId: number) => {
      await new APIRequestBuilder()
        .url(`/api/pray/${prayId}`)
        .delete()
        .requestNone();
    }
  }

}

const _inst = new APIService();

export default _inst;