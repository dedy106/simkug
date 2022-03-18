window.app_saku3_transaksi_yspt_simak_fBankVA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fBankVA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fBankVA";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Bank Virtual Account - VA", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.cb_pp = new saiCBBL(this,{bound:[20,18,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Daftar Bank","Data Bank"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Kode Bank","Nama","Aktif"],
					colWidth:[[2,1,0],[100,300,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,400,20],caption:"Nama", maxLength:50, tag:1});											
		this.cb_akun = new saiCBBL(this.pc1.childPage[1],{bound:[20,17,220,20],caption:"Akun KasBank", multiSelection:false, maxLength:10, tag:2 });		
		this.e_digawal = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Pos Digit Awal", tipeText:ttNilai, tag:1,text:"0"});									
		this.e_digjum = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"Panjang Digit", tipeText:ttNilai, tag:1,text:"0"});									
		this.e_digkoma = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"Digit Koma", tipeText:ttNilai, tag:1,text:"0"});									
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
	
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_akun.setSQL("select a.kode_akun, a.nama from masakun a "+
								"inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun KasBank",true);
			this.doLoad();		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fBankVA.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fBankVA.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();	
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; 						
					else vSts = "0";			

					sql.add("insert into sis_bankva(kode_bank,kode_lokasi,dig_awal,dig_jum,flag_aktif,kode_pp,nama,kode_akun,dig_koma) values "+
						    "('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+this.e_digawal.getText()+","+this.e_digjum.getText()+",'"+vSts+"','"+this.app._kodePP+"','"+this.e_nama.getText()+"','"+this.cb_akun.getText()+"',"+this.e_digkoma.getText()+")");					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; 						
					else vSts = "0";					

					sql.add("delete from sis_bankva where kode_bank = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ");			
					sql.add("insert into sis_bankva(kode_bank,kode_lokasi,dig_awal,dig_jum,flag_aktif,kode_pp,nama,kode_akun,dig_koma) values "+
							"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+this.e_digawal.getText()+","+this.e_digjum.getText()+",'"+vSts+"','"+this.app._kodePP+"','"+this.e_nama.getText()+"','"+this.cb_akun.getText()+"',"+this.e_digkoma.getText()+")");					
							
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sis_bankva where kode_bank = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ");			
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				this.simpan();				
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select * from sis_bankva where kode_bank ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);		
						this.cb_akun.setText(line.kode_akun);							
						this.e_digawal.setText(line.dig_awal);
						this.e_digjum.setText(line.dig_jum);
						this.e_digkoma.setText(line.dig_koma);
						if (line.flag_aktif == "1") var status = "1.AKTIF"; else var status = "0.NON"; 
						this.c_status.setText(status);	

						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));					
							
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){								
		var strSQL = "select kode_bank,nama, case when flag_aktif='1' then 'AKTIF' else 'NONAKTIF' end as sts "+
					 "from sis_bankva where kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' order by kode_bank desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_bank,line.nama,line.sts.toUpperCase()]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
