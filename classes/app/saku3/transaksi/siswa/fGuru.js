window.app_saku3_transaksi_siswa_fGuru = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fGuru.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fGuru";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Guru Matpel", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Guru Matpel","Data Guru Matpel"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:2,tag:9,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[250,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_nik = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"NIK",multiSelection:false,tag:1,change:[this,"doChange"]});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,23,200,20],caption:"Status Aktif",items:["1.AKTIF","0.NON"], readOnly:true,tag:2});
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[5,12,990,369], childPage:["Data Mata Pelajaran"]});		
		this.sg = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:4,tag:0,
		            colTitle:["Kode Matpel","Nama","Status","Keterangan"],					
					colWidth:[[3,2,1,0],[150,80,200,100]],					
					columnReadOnly:[true,[1,2,3,4]],								
					buttonStyle:[[0,2],[bsEllips,bsEllips]], 
					ellipsClick:[this,"doEllipseClick"],
					autoAppend:true,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();		

			this.cb_nik.setSQL("select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Pegawai",true);						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fGuru.extend(window.childForm);
window.app_saku3_transaksi_siswa_fGuru.implement({
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
						sql.add("delete from sis_guru_matpel where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						

					if (this.c_status.getText() == "1.AKTIF") vSts = "1"; else vSts = "0";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){																				
									sql.add("insert into sis_guru_matpel(kode_pp,kode_lokasi,kode_matpel,nik,flag_aktif,kode_status) values "+
						    				"('"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.cb_nik.getText()+"','"+vSts+"','"+this.sg.cells(2,i)+"')");
							}
						}						
					}
					
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
					sql.add("delete from sis_guru_matpel where nik = '"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'");			
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"));
				setTipeButton(tbSimpan);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :
			case "ubah" :	
				this.simpan();
				break;								
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		if (sender == this.cb_nik && this.cb_nik.getText()!="") {
			var strSQL = "select flag_aktif,kode_status from sis_guru_matpel where nik ='"+this.cb_nik.getText()+"' and kode_pp = '"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";						   
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){																			
					if (line.flag_aktif == "1") var status = "1.AKTIF"; else var status = "0.NON"; 
					this.c_status.setText(status);	
				}
			}	
			var data = this.dbLib.getDataProvider("select a.kode_matpel,b.nama,a.kode_status,c.nama as nama_sts "+
						"from sis_guru_matpel a "+
						"inner join sis_matpel b on a.kode_matpel=b.kode_matpel and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp "+
						"inner join sis_guru_status c on a.kode_status=c.kode_status and a.kode_lokasi=b.kode_lokasi and a.kode_pp=c.kode_pp "+
						"where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'  and a.kode_pp='"+this.app._kodePP+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData([line.kode_matpel,line.nama,line.kode_status,line.nama_sts]);
				}
			} else this.sg.clear(1);
		}
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Mata Pelajaran",sender,undefined, 
											  "select kode_matpel,nama from sis_matpel where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ",
											  "select count(kode_matpel) from sis_matpel where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'  and kode_pp='"+this.app._kodePP+"' ",
											  ["kode_matpel","nama"],"and",["Kode","Nama"],false);				
			}

			if (col == 2){
				this.standarLib.showListData(this, "Daftar Status Guru",sender,undefined, 
											  "select kode_status,nama from sis_guru_status where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'  and kode_pp='"+this.app._kodePP+"' ",
											  "select count(kode_status) from sis_guru_status where kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'  and kode_pp='"+this.app._kodePP+"' ",
											  ["kode_status","nama"],"and",["Kode","Nama"],false);				
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
				this.cb_nik.setText(this.sg1.cells(0,row));		
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
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
		var strSQL = "select distinct a.nik,a.nama from sis_guru_matpel b inner join karyawan a on "+
					 "a.nik=b.nik and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' ";		
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
			this.sg1.appendData([line.nik,line.nama]); 
		}
		this.sg1.setNoUrut(start);
		this.pc1.setActivePage(this.pc1.childPage[0]);	
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
