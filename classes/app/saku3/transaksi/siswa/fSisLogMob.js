window.app_saku3_transaksi_siswa_fSisLogMob = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSisLogMob.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSisLogMob";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Login Mobile Guru/Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_pp = new saiCBBL(this,{bound:[20,23,220,20],caption:"Sekolah", multiSelection:false, maxLength:10, tag:2});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Login","Data Login","Filter Cari"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["NIK/NIS","Nama","No HP","Status"],
					colWidth:[[3,2,1,0],[100,200,300,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg1,pager:[this,"doPager"]});
		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,22,200,20],caption:"Status",items:["GURU","SISWA"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.cb_id = new saiCBBL(this.pc1.childPage[1],{bound:[20,23,220,20],caption:"NIK/NIS", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});		
		this.e_pass = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Password", maxLength:10, tag:1});	
		this.e_hp = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"HP", maxLength:50, tag:1});	
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,13,100,18],caption:"Tgl Berakhir", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,13,100,18]}); 			
		this.c_aktif = new saiCB(this.pc1.childPage[1],{bound:[20,22,202,20],caption:"Status Aktif",items:["1.AKTIF","0.NONAKTIF"], readOnly:true,tag:2});		
			

		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"NIK/NIS",maxLength:10,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
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
			
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_pp='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Sekolah",true);
			this.cb_pp.setText(this.app._kodePP);

			this.c_status.setText("SISWA");

			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSisLogMob.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSisLogMob.implement({
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
					sql.add("insert into sis_hakakses(nik,pass,status_login,no_hp,kode_lokasi,kode_pp,tgl_selesai,flag_aktif,menu_mobile,nik_user,tgl_input) values "+
						    "('"+this.cb_id.getText()+"','"+this.e_pass.getText()+"','"+this.c_status.getText()+"','"+this.e_hp.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_aktif.getText().substr(0,1)+"','MOBILE','"+this.app._userLog+"',getdate())");				
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
					sql.add("delete from sis_hakakses where nik='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");					
					sql.add("insert into sis_hakakses(nik,pass,status_login,no_hp,kode_lokasi,kode_pp,tgl_selesai,flag_aktif,menu_mobile,nik_user,tgl_input) values "+
						    "('"+this.cb_id.getText()+"','"+this.e_pass.getText()+"','"+this.c_status.getText()+"','"+this.e_hp.getText()+"','"+this.app._lokasi+"','"+this.cb_pp.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_aktif.getText().substr(0,1)+"','MOBILE','"+this.app._userLog+"',getdate())");				
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
					sql.add("delete from sis_hakakses where nik='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"'");					
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_id);					
					this.doLoad();
					setTipeButton(tbAllFalse);
				}
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
			if (sender == this.c_status && this.c_status.getText() != ""){
				if (this.c_status.getText() == "GURU") {
					this.cb_id.setSQL("select nik, nama from karyawan where status = 'GURU' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data User",true);	
				}
				else {
					this.cb_id.setSQL("select nis, nama from sis_siswa where flag_aktif = '01' and kode_pp='"+this.cb_pp.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nis","nama"],false,["NIS","Nama"],"and","Data User",true);	
				}
			}
			
			if (sender == this.cb_id && this.cb_id.getText() != ""){
				var data = this.dbLib.getDataProvider("select * from sis_hakakses where kode_pp='"+this.cb_pp.getText()+"' and nik='"+this.cb_id.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){									
						this.e_pass.setText(line.pass);
						this.e_hp.setText(line.no_hp);
						this.dp_d1.setText(line.tgl_selesai);

						if (line.flag_aktif == "1") this.c_aktif.setText("1.AKTIF");
						else this.c_aktif.setText("0.NONAKTIF");					
						setTipeButton(tbUbahHapus);
					}
					else setTipeButton(tbSimpan);
				}
				else setTipeButton(tbSimpan);
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_id.getText()+")");														
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
	doCari:function(sender){								
		try {
			var filter = " a.nik like '%"+this.e_kode2.getText()+"%' and ";
					  
			var strSQL = "select a.nik,b.nama,a.no_hp,'siswa' as status "+
						 "from sis_hakakses a inner join sis_siswa b on a.nik=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where  "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' "+
						 
						 "union all "+
						 
						 "select a.nik,b.nama,a.no_hp,'guru' as status "+
						 "from sis_hakakses a inner join karyawan b on a.nik=b.nik and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where  "+filter+" a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' ";

			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select a.nik,b.nama,a.no_hp,'siswa' as status "+
						 "from sis_hakakses a inner join sis_siswa b on a.nik=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' "+
						 
						 "union all "+
						 
						 "select a.nik,b.nama,a.no_hp,'guru' as status "+
						 "from sis_hakakses a inner join karyawan b on a.nik=b.nik and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  "+					 
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.cb_pp.getText()+"' "+

						 "order by a.nik";		

			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.nik,line.nama,line.no_hp,line.status.toUpperCase()]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_id.setText(this.sg1.cells(0,row));					
			}
		} catch(e) {alert(e);}
	}
});