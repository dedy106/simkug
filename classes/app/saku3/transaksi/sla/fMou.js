window.app_saku3_transaksi_sla_fMou = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fMou.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fMou";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data MoU Pinjaman", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.cb_cocd = new portalui_saiCBBL(this,{bound:[20,10,220,20],caption:"Data CoCd",tag:2, multiSelection:false,change:[this,"doChange"]});

		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar MoU","Data MoU"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["ID MoU","Deskripsi","Mitra","Nilai"],
					colWidth:[[3,2,1,0],[100,200,300,200]],
					colFormat:[[3],[cfNilai]],
					readOnly:true,
					autoPaging:true, rowPerPage:20,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_mitra = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"Data Mitra",tag:1, multiSelection:false});
		this.cb_class = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,18,220,20],caption:"Classification",tag:2, multiSelection:false});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,500,20],caption:"ID MoU",maxLength:50,change:[this,"doChange"]});		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,500,20],caption:"Deskripsi", maxLength:50, tag:1});	
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Currency",items:["IDR","USD","JPY"], readOnly:true,tag:2});		
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Nilai",tag:1,tipeText:ttNilai,text:"0",change:[this,"doChange"]});									
		this.e_real = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,20,200,20],caption:"Realisasi",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});											
		this.e_sisa = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,21,200,20],caption:"Sisa MoU",tag:1,readOnly:true,tipeText:ttNilai,text:"0"});											

		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,12,995,212], childPage:["Upload Dokumen"]});		
		this.sgUpld = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5, tag:9,
				colTitle:["KdDok","Jenis Dokumen","Path File","Upload","DownLoad"],
				colWidth:[[4,3,2,1,0],[80,80,480,200,80]], 
				columnReadOnly:[true,[0,1,2,3,4],[]],					
				colFormat:[[3,4],[cfUpload,cfButton]], 
				buttonStyle:[[0],[bsEllips]], 	
				click:[this,"doSgBtnClick"], colAlign:[[4],[alCenter]],
				ellipsClick:[this,"doEllipsClickDok"],readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([3],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});

		this.sgFile = new saiGrid(this.pc2.childPage[0],{bound:[40,50,300,100],colCount:2,tag:9,visible:false,
			colTitle:["namaFile","status"],
			colWidth:[[1,0],[80,180]],
			readOnly: true,autoAppend:false,defaultRow:1});

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
									
			this.cb_cocd.setSQL("select cocd,company_name from mysym_company_code",["cocd","company_name"],false,["Kode","Nama"],"and","Data CoCd",true);									
			this.cb_mitra.setSQL("select kode_mitra,nama from sla_mitra",["kode_mitra","nama"],false,["Kode","Nama"],"and","Data Mitra",true);									
			this.cb_class.setSQL("select kode_class,nama from sla_class ",["kode_class","nama"],false,["Kode","Nama"],"and","Classification",true);									

			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fMou.extend(window.childForm);
window.app_saku3_transaksi_sla_fMou.implement({
	doGridChange: function(sender, col, row,param1,result, data){
		try{        	
		if (sender == this.sgUpld && col == 3){ 
			if (this.uploadedFiles == undefined) this.uploadedFiles = "";
			if (this.uploadedFiles != "") this.uploadedFiles +=";";
			this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(3).param2 + data.tmpfile;
			this.sgUpld.cells(2,row, data.tmpfile);       
			this.sgUpld.cells(4,row, "DownLoad");                
					}
			}catch(e){
					alert(e+" "+data);
			}
	},
	doEllipsClickDok: function(sender, col, row){
		try{			
			if (sender == this.sgUpld) {				
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Jenis Dokumen",sender,undefined, 
													"select kode_jenis,nama   from sla_dok_jenis where kode_cocd = '"+this.cb_cocd.getText()+"'",
													"select count(kode_jenis) from sla_dok_jenis where kode_cocd = '"+this.cb_cocd.getText()+"'",
													["kode_jenis","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 4)
				window.open("server/media/"+this.sgUpld.getCell(2,row));
		}catch(e){
			alert(e);
		}
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
					sql.add("insert into sla_mou(kode_mou,kode_cocd,kode_mitra,kode_class,nama,kode_curr,nilai) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_cocd.getText()+"','"+this.cb_mitra.getText()+"','"+this.cb_class.getText()+"','"+this.e_nama.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+")");					

					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {																																			
							sql.add("insert into sla_dok(no_bukti,no_gambar,nu,kode_jenis,kode_cocd,no_ref,form) values ('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.cb_cocd.getText()+"','"+this.cb_kode.getText()+"','SLA_MOU')");								
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
					sql.add("delete from sla_mou where kode_mou='"+this.cb_kode.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");					
					sql.add("delete from sla_dok where no_bukti='"+this.cb_kode.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
										
					sql.add("insert into sla_mou(kode_mou,kode_cocd,kode_mitra,kode_class,nama,kode_curr,nilai) values "+
						    "('"+this.cb_kode.getText()+"','"+this.cb_cocd.getText()+"','"+this.cb_mitra.getText()+"','"+this.cb_class.getText()+"','"+this.e_nama.getText()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+")");					

					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i) && this.sgUpld.cells(2,i)!="-") {							
							for (var j=0;j < this.sgFile.getRowCount();j++){
								if (this.sgUpld.cells(2,i) == this.sgFile.cells(0,j)) {
									this.sgFile.cells(1,j,"PAKAI");									
								}
							}																					
							sql.add("insert into sla_dok(no_bukti,no_gambar,nu,kode_jenis,kode_cocd,no_ref,form) values ('"+this.cb_kode.getText()+"','"+this.sgUpld.cells(3,i).tmpfile+"','"+i+"','"+this.sgUpld.cells(0,i)+"','"+this.cb_cocd.getText()+"','"+this.cb_kode.getText()+"','SLA_MOU')");								
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
					sql.add("delete from sla_mou where kode_mou='"+this.cb_kode.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");					
					sql.add("delete from sla_dok where no_bukti='"+this.cb_kode.getText()+"' and kode_cocd='"+this.cb_cocd.getText()+"'");
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					this.doLoad();
					this.sgUpld.clear(1);
					this.sgFile.clear();
					setTipeButton(tbAllFalse);
				}
				break;
			case "simpan" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai MoU tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				else
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai MoU tidak boleh kurang atau sama dengan nol.");
					return false;
				}
				if (nilaiToFloat(this.e_nilai.getText()) < nilaiToFloat(this.e_real.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai MoU kurang dari Nilai yang sudah Realisasi.");
					return false;
				}
				else
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.e_nilai && this.e_nilai.getText()!="") {
				var sls = nilaiToFloat(this.e_nilai.getText()) - nilaiToFloat(this.e_real.getText());
				this.e_sisa.setText(floatToNilai(sls));
			}
			if (sender == this.cb_cocd && this.cb_cocd.getText()!="") this.doLoad();
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){				
				var strSQL = "select a.*, isnull(b.realisasi,0) as realisasi, a.nilai - isnull(b.realisasi,0) as sisa "+
							 "from sla_mou a "+
							 "		left join ( "+
							 "          select kode_mou,sum(nilai) as realisasi "+
							 "			from sla_kkp_m where kode_cocd='"+this.cb_cocd.getText()+"'  "+							 
							 "			group by kode_mou "+
							 "		) b on a.kode_mou=b.kode_mou "+
						     "where a.kode_mou ='"+this.cb_kode.getText()+"' and a.kode_cocd='"+this.cb_cocd.getText()+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_nama.setText(line.nama);
						this.c_curr.setText(line.kode_curr);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_real.setText(floatToNilai(line.realisasi));	
						this.e_sisa.setText(floatToNilai(line.sisa));

						this.cb_mitra.setText(line.kode_mitra);
						this.cb_class.setText(line.kode_class);
						
						this.sgUpld.clear(); this.sgFile.clear();															
						var data = this.dbLib.getDataProvider(
								"select b.kode_jenis,b.nama,a.no_gambar from sla_dok a inner join sla_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_cocd=b.kode_cocd "+
								"where a.no_bukti = '"+this.cb_kode.getText()+"' and a.kode_cocd='"+this.cb_cocd.getText()+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgUpld.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];							
								this.sgFile.appendData([line.no_gambar,"HAPUS"]);
								this.sgUpld.appendData([line.kode_jenis, line.nama, line.no_gambar, {filedest:line.no_gambar, tmpfile:line.no_gambar},"DownLoad"]);
							}
						} else this.sgUpld.clear(1);

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
						if (result.toLowerCase().search("error") == -1)	{									
							for (var i=0;i < this.sgFile.getRowCount();i++){
								if (this.sgFile.cells(1,i) == "HAPUS") {
									this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.sgFile.cells(0,i));
								}
							}
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.cb_kode.getText()+")");														
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
		try {
			var strSQL = "select a.kode_mou,b.nama,a.nama as ket,a.nilai "+
						 "from sla_mou a inner join sla_mitra b on a.kode_mitra=b.kode_mitra "+					 
						 "where a.kode_cocd='"+this.cb_cocd.getText()+"'  order by a.kode_mou";							
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.sg1.clear();
				for (var i=0;i<data.rs.rows.length;i++){
					var line = this.dataJU.rs.rows[i];							
					this.sg1.appendData([line.kode_mou,line.ket,line.nama,floatToNilai(line.nilai)]); 
				}			
			} 
			else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {
		this.sg.doSelectPage(page);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	}	
});