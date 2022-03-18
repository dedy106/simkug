window.app_saku3_transaksi_tarbak_fHrSeleksi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrSeleksi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrSeleksi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Seleksi : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal - Periode", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[230,11,80,20],caption:"",tag:2,readOnly:true,change:[this,"doChange"],labelWidth:0});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,400], childPage:["Daftar Seleksi","Data Seleksi"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		             colTitle:["No Bukti","Tanggal","Proses","Lowongan","Deskripsi","kode_proses","kode_job"],
					colWidth:[[6,5,4,3,2,1,0],[0,0,200,150,150,100,100]],readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});			
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
				
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this.pc1.childPage[1],"doSelectDate"],date:new Date().getDateStr()}); 
		this.cb_proses = new saiCBBL(this.pc1.childPage[1],{bound:[20,10,222,20],caption:"Proses Seleksi", multiSelection:false, maxLength:10, tag:2});	
		this.cb_job = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,222,20],caption:"Lowongan", multiSelection:false, maxLength:10, tag:2});								
		this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Deskripsi", maxLength:150});
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[20,20,495,250],colCount:2,tag:0,
		            colTitle:["NIP","Nama"],
					colWidth:[[1,0],[300,70]],
					columnReadOnly:[true,[0,1]],
					buttonStyle:[[0],[bsEllips]], 
					defaultRow:1,
					change:[this,"doCellChange"],ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[20,410,499,25],buttonStyle:2,grid:this.sg});
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_proses.setSQL("select kode_proses, nama from hr_proses where kode_lokasi='"+this.app._lokasi+"'",["kode_proses","nama"],false,["Kode","Nama"],"and","Data Proses",true);			
			this.cb_job.setSQL("select kode_job, nama from hr_job where  kode_lokasi='"+this.app._lokasi+"'",["kode_job","nama"],false,["Kode","Nama"],"and","Data Lowongan",true);
			this.doLoad();
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrSeleksi.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrSeleksi.implement({
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
					sql.add("insert into hr_seleksi_m(no_seleksi,kode_lokasi,periode,tanggal,keterangan,kode_proses,kode_job,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_proses.getText()+"','"+this.cb_job.getText()+"',getdate(),'"+this.app._userLog+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into hr_seleksi_d(no_seleksi,nip,kode_lokasi) values "+
										"	('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"')");
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
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hr_seleksi_m where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from hr_seleksi_d where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into hr_seleksi_m(no_seleksi,kode_lokasi,periode,tanggal,keterangan,kode_proses,kode_job,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_proses.getText()+"','"+this.cb_job.getText()+"',getdate(),'"+this.app._userLog+"')");					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into hr_seleksi_d(no_seleksi,nip,kode_lokasi) values "+
										"	('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.app._lokasi+"')");
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
					sql.add("delete from hr_seleksi_m where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					sql.add("delete from hr_seleksi_d where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
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
			/*
			if (this.e_nb.getText() != ""){
				var strSQL = "select kode_loker,nama from hr_loker where kode_loker ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_nama.setText(line.nama);						
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
			*/
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},
	doClick:function(sender){
		if (sender == this.i_gen) {			
			if (this.stsSimpan == 0) {									
				this.sg.clear(1);this.sg4.clear(1);
				this.e_nilai.setText("0");
				this.bTampil.show();				
			}	
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"hr_seleksi_m","no_seleksi",this.app._lokasi+"-SEL"+this.e_periode.getText().substr(2,4)+".","0000"));
			
			setTipeButton(tbSimpan);
			this.stsSimpan = 1;
		}		
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Pelamar",this.sg, this.sg.row, this.sg.col, 
														"select nip, nama  from hr_pelamar where kode_lokasi='"+this.app._lokasi+"'",
														"select count(nip	) from hr_pelamar where kode_lokasi='"+this.app._lokasi+"'",
														 new Array("nip","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doBtnClick: function(sender, event){
		try{
			if (sender == this.e_nb) {   
			    this.standarLib.showListData(this, "Daftar Flag Akun",sender,undefined, 
											  "select kode_loker, nama  from hr_loker where kode_lokasi='"+this.app._lokasi+"'",
											  "select count(kode_loker) from hr_loker where kode_lokasi='"+this.app._lokasi+"'",
											  ["kode_loker","nama"],"where",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.e_nb.getText()+")");							
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
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));	
				this.e_ket.setText(this.sg1.cells(3,row));	
				this.cb_proses.setText(this.sg1.cells(5,row));	
				this.cb_job.setText(this.sg1.cells(6,row));	
				this.dp_d1.setText(this.sg1.cells(1,row));
										
				var data = this.dbLib.getDataProvider("select a.nip,b.nama "+
							"from hr_seleksi_d a "+
							"inner join hr_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi "+												
							"where a.no_seleksi = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nip ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg.appendData([line.nip,line.nama]);
					}
				} else this.sg.clear(1);	
				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var strSQL = "select a.no_seleksi,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.kode_proses,a.kode_job,b.nama as nama_proses,c.nama as nama_job "+
		             "from hr_seleksi_m a "+
					 "inner join hr_proses b on a.kode_proses=b.kode_proses and a.kode_lokasi=b.kode_lokasi "+
					 "inner join hr_job c on a.kode_job=c.kode_job and a.kode_lokasi=c.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' order by a.no_seleksi ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_seleksi,line.tgl,line.nama_proses,line.nama_job,line.keterangan,line.kode_proses,line.kode_job]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});