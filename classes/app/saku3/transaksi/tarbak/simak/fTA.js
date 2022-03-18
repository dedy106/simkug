window.app_saku3_transaksi_tarbak_simak_fTA = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_simak_fTA.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_simak_fTA";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tahun Ajaran", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.cb_pp = new saiCBBL(this,{bound:[20,18,220,20],caption:"Sekolah", readOnly:true, maxLength:10, tag:2});
		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Daftar Tahun Ajaran","Data Tahun Ajaran","Closing TA"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Kode TA","Nama","Tgl Mulai","Tgl Akhir","Aktif"],
					colWidth:[[4,3,2,1,0],[100,120,120,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,400,20],caption:"Nama", maxLength:50, tag:1});									
		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1mulai = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});														
		this.l_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Akhir", underline:true});
		this.dp_d1akhir = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});															
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
	
		this.cb_ta = new saiCBBL(this.pc1.childPage[2],{bound:[20,13,220,20],caption:"Tahun Ajaran", readOnly:true, tag:9});			
		this.bTampil = new button(this.pc1.childPage[2],{bound:[120,17,98,20],caption:"Closing TA",click:[this,"doClose"]});			

		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);

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
			
			this.doLoad();		

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_simak_fTA.extend(window.childForm);
window.app_saku3_transaksi_tarbak_simak_fTA.implement({
	doClose : function() {
		//me-reset sttaus siswa jika kenaikan kelas terjadi, untuk kontrol siswa mana saja yg tidak terupdate datanya saat update kelas
		//0--> status idle/tidak terpakai
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();	
		sql.add("insert into sis_siswa_close (kode_pp,kode_lokasi,kode_ta,flag_aktif) "+
				"select kode_pp,kode_lokasi,kode_ta,flag_aktif from sis_siswa where kode_pp='"+this.cb_pp.getText()+"'  and kode_lokasi ='"+this.app._lokasi+"' and flag_aktif='1' ");
		sql.add("update sis_siswa set flag_aktif='0' where kode_pp='"+this.cb_pp.getText()+"'  and kode_lokasi ='"+this.app._lokasi+"' and flag_aktif='1'");		
		this.dbLib.execArraySQL(sql);	
	},
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
					if (this.c_status.getText() == "1.AKTIF") {
						vSts = "1"; 
						sql.add("update sis_ta set flag_aktif='0' "+
					        	"where kode_ta <> '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");
					}
					else vSts = "0";			

					sql.add("insert into sis_ta(kode_ta,kode_lokasi,tgl_mulai,tgl_akhir,flag_aktif,kode_pp,nama) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.app._lokasi+"','"+this.dp_d1mulai.getDateString()+"','"+this.dp_d1akhir.getDateString()+"','"+vSts+"','"+this.app._kodePP+"','"+this.e_nama.getText()+"')");					
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
					if (this.c_status.getText() == "1.AKTIF") {
						vSts = "1"; 
						sql.add("update sis_ta set flag_aktif='0' "+
					        	"where kode_ta <> '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");
					}
					else vSts = "0";					
					sql.add("update sis_ta set nama='"+this.e_nama.getText()+"', flag_aktif='"+vSts+"',tgl_mulai='"+this.dp_d1mulai.getDateString()+"',tgl_akhir='"+this.dp_d1akhir.getDateString()+"' "+
					        "where kode_ta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ");
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
					sql.add("delete from sis_ta where kode_ta = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ");			
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
				var strSQL = "select kode_ta from sis_ta where kode_ta ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Kode TA Duplikasi.","Duplikasi dengan Kode  ["+line.kode_ta+"]");
						return false;
					}					
				}

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
				var strSQL = "select nama, flag_aktif,tgl_mulai,tgl_akhir from sis_ta where kode_ta ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_nama.setText(line.nama);							
						this.dp_d1mulai.setText(line.tgl_mulai);
						this.dp_d1akhir.setText(line.tgl_akhir);																
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
				
				this.cb_ta.setText(this.sg1.cells(0,row),this.sg1.cells(1,row));																			
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
		var strSQL = "select kode_ta,nama,convert (varchar, tgl_mulai,103) as tgl_mulai,convert (varchar, tgl_akhir,103) as tgl_akhir, case when flag_aktif='1' then 'AKTIF' else 'NONAKTIF' end as sts "+
					 "from sis_ta where kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' order by kode_ta desc";		
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
			this.sg1.appendData([line.kode_ta,line.nama,line.tgl_mulai,line.tgl_akhir,line.sts.toUpperCase()]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
