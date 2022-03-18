window.app_saku3_transaksi_siaga_hris_karyawan_fRwyDidik = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fRwyDidik.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fRwyDidik";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Riwayat Pendidikan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		uses("saiGrid",true);	
		
		this.pc1 = new pageControl(this,{bound:[10,23,1160,433],childPage:["Data Pendidikan","Riwayat Pendidikan"]});
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"ID",maxLength:10,tag:0,multiSelection:false,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,500,20],caption:"Keterangan", tag:1, labelWidth:100,maxLength:100});		
		this.e_ins = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,500,20],caption:"Institusi", tag:1, labelWidth:100,maxLength:100});		
		this.cb_strata = new saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Strata",maxLength:10,tag:1,multiSelection:false,change:[this,"doChange"]});		
		this.cb_jur = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,220,20],caption:"Jurusan",maxLength:10,tag:1,multiSelection:false,change:[this,"doChange"]});		
		this.e_th = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Tahun Lulus", tag:1, labelWidth:100,maxLength:100});		
		this.c_dana = new saiCB(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Pendanaan",maxLength:10,tag:1,items:["Pribadi","Perusahaan"],change:[this,"doChange"]});		
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
					colTitle: ["No. Urut","Institusi","Strata","Jurusan","Tahun Lulus","Pendanaan","Keterangan"],		
					colWidth:[[6,5,4,3,2,1,0],[400,100,80,200,200,200,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					defaultRow:1,
					dblClick:[this,"doDoubleClick"],
					autoAppend:true});
		this.sgn =  new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2, grid:this.sg, pager:[this,"doPager"]});		
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.cb_nik.setSQL("select nik, nama, nik2 from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","nik2"],false,["ID","Nama","NIK Gratika"],"and","Data Karyawan",true);
			this.cb_strata.setSQL("select kode_strata, nama from gr_strata where kode_lokasi='"+this.app._lokasi+"'",["kode_strata","nama"],false,["Kode Strata","Nama"],"and","Data Strata",true);
			this.cb_jur.setSQL("select kode_jur, nama from gr_jur where kode_lokasi='"+this.app._lokasi+"'",["kode_jur","nama"],false,["Kode Jurusan","Nama"],"and","Data Jurusan",true);			

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fRwyDidik.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fRwyDidik.implement({
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
						var strSQL = "select count(*)+1 as nu from gr_rwypddk where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   
						var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object"){
							var line3 = data.rs.rows[0];							
							if (line3 != undefined){																			
								this.nu = line3.nu;	
							}
						}
						sql.add("insert into gr_rwypddk(nik,no_urut,kode_lokasi,kode_strata,kode_jur,institusi,tahun,keterangan,setara,dana,nik_user,tgl_input) values "+
										"	('"+this.cb_nik.getText()+"',"+this.nu+",'"+this.app._lokasi+"','"+this.cb_strata.getText()+"','"+this.cb_jur.getText()+"','"+this.e_ins.getText()+"','"+this.e_th.getText()+"','"+this.e_ket.getText()+"','"+this.cb_jur.getText()+"','"+this.c_dana.getText()+"','"+this.app._userLog+"',getdate())");
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
					sql.add("update gr_rwypddk set kode_strata='"+this.cb_strata.getText()+"',kode_jur='"+this.cb_jur.getText()+"',institusi='"+this.e_ins.getText()+"',tahun='"+this.e_th.getText()+"',keterangan='"+this.e_ket.getText()+"',setara='"+this.cb_jur.getText()+"',dana='"+this.c_dana.getText()+"',nik_user='"+this.app._userLog+"',tgl_input=getdate() "+
							"where nik='"+this.cb_nik.getText()+"' and no_urut='"+this.nu+"' and kode_lokasi='"+this.app._lokasi+"' ");				
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
					sql.add("delete from gr_rwypddk where nik = '"+this.cb_nik.getText()+"' and no_urut='"+this.nu+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("1"),this.cb_nik);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
			if (sender == this.cb_nik && this.cb_nik.getText() != ""){
				// var data = this.dbLib.getDataProvider("select a.no_urut, a.kode_strata+' | '+b.nama as strata, a.kode_jur+' | '+ c.nama as jur, a.institusi,a.tahun, a.keterangan,a.dana "+
				// 	  "from gr_rwypddk a inner join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi "+
				// 	  "                   inner join gr_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
				// 	  "where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",true);
				// if (typeof data == "object" && data.rs.rows[0] != undefined){
				// 	var line;
				// 	this.sg.clear();
				// 	for (var i in data.rs.rows){
				// 		line = data.rs.rows[i];							
				// 		this.sg.appendData([line.no_urut,line.institusi,line.strata,line.jur,line.tahun,line.dana,line.keterangan]);
				// 	}
				// } else this.sg.clear(1);
				var strSQL = "select a.kode_strata,a.kode_jur from gr_karyawan a inner join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi inner join gr_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.cb_strata.setText(line.kode_strata);
						this.cb_jur.setText(line.kode_jur);
						
						
						var data2 = this.dbLib.getDataProvider("select a.no_urut, a.kode_strata+' | '+b.nama as strata, a.kode_jur+' | '+ c.nama as jur, a.institusi,a.tahun, a.keterangan,a.dana "+
						"from gr_rwypddk a inner join gr_strata b on a.kode_strata=b.kode_strata and a.kode_lokasi=b.kode_lokasi "+
						"                   inner join gr_jur c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi "+
						"where a.nik = '"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"'",true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];		
								this.sg.appendData([line2.no_urut,line2.institusi,line2.strata,line2.jur,line2.tahun,line2.dana,line2.keterangan]);
							}
						} else this.sg.clear(1);
					}
				}	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {		
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				var strSQL = "select * from gr_rwypddk "+
							 "where nik='"+this.cb_nik.getText()+"' and no_urut='"+ this.sg.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_ket.setText(line.keterangan);							
						this.cb_strata.setText(line.kode_strata);							
						this.cb_jur.setText(line.kode_jur);							
						this.e_ins.setText(line.institusi);							
						this.e_th.setText(line.tahun);							
						this.c_dana.setText(line.dana);				
						this.nu = line.no_urut;						
					} 
					
				}											
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
