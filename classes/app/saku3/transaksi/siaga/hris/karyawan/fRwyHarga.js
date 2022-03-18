window.app_saku3_transaksi_siaga_hris_karyawan_fRwyHarga = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fRwyHarga.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fRwyHarga";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Riwayat Penghargaan", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		uses("saiGrid",true);	

		this.cb_nik = new saiCBBL(this,{bound:[20,10,240,20],caption:"ID",maxLength:10,multiSelection:false, labelWidth:120,change:[this,"doChange"]});
		this.l_tgl = new portalui_label(this,{bound:[20,16,120,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,16,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});
		this.e_ket = new saiLabelEdit(this,{bound:[20,20,520,20],caption:"Bentuk Penghargaan", tag:1, labelWidth:120,maxLength:100});		
		this.e_dok = new saiLabelEdit(this,{bound:[20,21,350,20],caption:"No Surat", tag:1, labelWidth:120,maxLength:100});	
		this.l_tgl2 = new portalui_label(this,{bound:[20,16,120,18],caption:"Tgl Surat", underline:true});
		this.dp_d2 = new portalui_datePicker(this,{bound:[140,16,98,18]});
		this.e_file = new saiLabelEdit(this,{bound:[20,19,450,20],caption:"Path File", labelWidth:120, readOnly:true, tag:9});		
		this.uploader = new uploader(this,{bound:[480,19,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this,{bound:[580,19,80,18],caption:"Lihat File",click:[this,"doLihat2"],visible:true});			
			
		this.bTampil = new button(this,{bound:[829,19,80,18],caption:"Lihat Data",click:[this,"doLihat"]});			
		
		this.pc2 = new pageControl(this,{bound:[10,23,900,340],childPage:["List Penghargaan"]});
		this.sg1 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],readOnly:true,colCount:6,tag:9,
					colTitle: ["No. Sistem","Tanggal","Bentuk Penghargaan","No Surat","Tanggal SK","File"],		
					colWidth:[[5,4,3,2,1,0],[200,100,200,460,100,100]],
					readOnly:true,dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		this.sgn1 =  new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
		
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.cb_nik.setSQL("select nik, nama, nik2 from gr_karyawan where flag_aktif='0' and kode_lokasi='"+this.app._lokasi+"'",["nik","nama","nik2"],false,["ID","Nama","NIK Gratika"],"and","Data Karyawan",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fRwyHarga.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fRwyHarga.implement({
	doLihat2: function(sender){
		try{			
			if (this.e_file.getText() != "" || this.e_file.getText() != "-") window.open("server/media/"+this.e_file.getText());						
		}catch(e){
			alert(e);
		}
	},
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
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
					var strSQL = "select convert(varchar(6), GETDATE(),112) as periode";						   
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line3 = data.rs.rows[0];							
						if (line3 != undefined){																			
							this.periode = line3.periode;	
						}
					}
					var id = this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rwyharga","no_sk",this.app._lokasi+"-ID"+this.periode+".","0000")
					
					sql.add("insert into gr_rwyharga(nik,no_sk,kode_lokasi,keterangan,nilai,nik_user,tgl_input,tanggal,no_dok,tgl_surat,gambar) values "+//,"+parseNilai(this.e_nilai.getText())+"
						    "	('"+this.cb_nik.getText()+"','"+id+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"',0,'"+this.app._userLog+"',getdate(),'"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.dp_d2.getDateString()+"','"+this.e_file.getText()+"')");					
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
					sql.add("update gr_rwyharga set tanggal='"+this.dp_d1.getDateString()+"', keterangan='"+this.e_ket.getText()+"',no_dok='"+this.e_dok.getText()+"',tgl_surat='"+this.dp_d2.getDateString()+"',gambar='"+this.e_file.getText()+"' where no_sk = '"+this.no_sk+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");								
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rwyharga where no_sk = '"+this.no_sk+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.cb_nik);

					setTipeButton(tbAllFalse);
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
	
	doLihat: function(sender){
		try{			
			var strSQL =  "select a.no_sk, a.tanggal,a.keterangan,a.no_dok,a.tgl_surat,a.gambar "+
						  "from gr_rwyharga a where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal desc";
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
		}catch(e){
			systemAPI.alert(e);
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
			this.sg1.appendData([line.no_sk,line.tanggal,line.keterangan,line.no_dok,line.tgl_surat,line.gambar]); 
		}
		this.sg1.setNoUrut(start);
	},

	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "" ) {		
				setTipeButton(tbUbahHapus);
				var strSQL = "select * from gr_rwyharga "+
							 "where no_sk='"+ this.sg1.cells(0,row)+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.dp_d1.setText(line.tanggal);							
						this.e_ket.setText(line.keterangan);	
						this.e_dok.setText(line.no_dok);	
						this.no_sk = line.no_sk;
						this.dp_d2.setText(line.tgl_surat);
						this.e_file.setText(line.gambar);
						this.fileBfr = line.gambar;	
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
							if (this.fileBfr && this.dataUpload) {
								if (this.fileBfr != this.e_file.getText()) this.fileUtil.deleteFile(this.rootDir+"/server/media/"+this.fileBfr);
							}									
							if (this.dataUpload) this.fileUtil.copyFileTo(this.rootDir+"/"+this.uploader.param2+this.dataUpload.tmpfile,this.rootDir+"/"+this.uploader.param4+this.dataUpload.filedest);

							system.info(this,"Transaksi telah sukses tersimpan (Kode : "+ this.cb_nik.getText()+")","");	
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
