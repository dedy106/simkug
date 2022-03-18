window.app_saku3_transaksi_siaga_hris_karyawan_fRwySanksi = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_karyawan_fRwySanksi.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_karyawan_fRwySanksi";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Riwayat Sanksi", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker;label");
		uses("saiGrid",true);	
		this.pc1 = new pageControl(this,{bound:[10,10,1000,450],childPage:["Data Sanksi","Riwayat Sanksi"]});
		this.cb_nik = new saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"ID",maxLength:10,multiSelection:false,tag:0, change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,500,20],caption:"Keterangan", maxLength:150,tag:1});		
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,350,20],caption:"No Surat", tag:1,maxLength:100});
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tgl Surat", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18]});				
		this.cb_sanksi = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Sanksi",maxLength:10,multiSelection:false,tag:1});		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Berlaku", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.e_lama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,21,200,20],caption:"Lama Hari", tag:1, tipeText:ttNilai, text:"0", change:[this,"doChange"]});		
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[20,15,100,18],caption:"Tgl Berakhir", underline:true});		
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,15,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.e_file = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,19,450,20],caption:"Path File", readOnly:true, tag:9});		
		this.uploader = new uploader(this.pc1.childPage[0],{bound:[480,19,80,18],caption:"Browse File", param1:"uploadTo",param2:"server/media/tmp/",param3:"object",param4:"server/media/",autoSubmit:true, afterUpload:[this,"doAfterLoad"]});				
		this.bLihat = new button(this.pc1.childPage[0],{bound:[580,19,80,18],caption:"Lihat File",click:[this,"doLihat2"],visible:true});	
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],readOnly:true,colCount:11,tag:9,
					colTitle: ["Tanggal","Sanksi","Keterangan","Lama","Tgl Berlaku","Tgl Berakhir","No.Sistem","Flag","No Surat","Tgl Surat","File"],		
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[200,100,200,80,100,100,100,80,400,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});
		this.sgn1 =  new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			
		this.rearrangeChild(10, 22);
		this.pc1.childPage[0].rearrangeChild(10, 23);					
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
			this.cb_sanksi.setSQL("select sts_sanksi, nama from gr_status_sanksi where kode_lokasi='"+this.app._lokasi+"'",["sts_sanksi","nama"],false,["Kode","Nama"],"and","Data Daftar Sanksi",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_karyawan_fRwySanksi.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_karyawan_fRwySanksi.implement({
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
					var id = this.standarLib.noBuktiOtomatis(this.dbLib,"gr_rwysanksi","no_sk",this.app._lokasi+"-ID"+this.periode+".","0000")
					
					sql.add("update gr_rwysanksi set flag_aktif='0',flag_seb='"+id+"'  where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='1'");																				
					sql.add("insert into gr_rwysanksi(nik,no_sk,kode_lokasi,sts_sanksi,lama,tgl_mulai,tgl_selesai,nik_user,tgl_input,keterangan,flag_aktif,flag_seb,no_dok,tgl_surat,gambar) values "+
						    "	('"+this.cb_nik.getText()+"','"+id+"','"+this.app._lokasi+"','"+this.cb_sanksi.getText()+"',"+nilaiToFloat(this.e_lama.getText())+",'"+this.dp_d1.getDateString()+"','"+this.dp_d2.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_ket.getText()+"','1','-','"+this.e_dok.getText()+"','"+this.dp_d3.getDateString()+"','"+this.e_file.getText()+"')");					
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
					sql.add("update gr_rwysanksi set keterangan='"+this.e_ket.getText()+"',sts_sanksi='"+this.cb_sanksi.getText()+"',tgl_mulai='"+this.dp_d1.getDateString()+"',tgl_selesai='"+this.dp_d2.getDateString()+"',lama="+nilaiToFloat(e_lama.getText())+",no_dok='"+this.e_dok.getText()+"',tgl_surat='"+this.dp_d3.getDateString()+"',gambar='"+this.e_file.getText()+"' "+
							"where no_sk='"+this.no_sk+"' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
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
					sql.add("update gr_rwysanksi set flag_aktif='1',flag_seb='-' where flag_seb='"+this.no_sk+"' and nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif='0' ");																				
					sql.add("delete from gr_rwysanksi where no_sk = '"+this.no_sk+"' and nik = '"+this.cb_nik.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");			
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
					this.standarLib.clearByTag(this, new Array("1","9"),this.cb_nik);
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :		
				var strSQL = "select top 1 convert(varchar,tgl_mulai,103)  as tgl_awal,convert(varchar,tgl_selesai,103)  as tgl_akhir "+
						 	 "from gr_rwysanksi "+
							 "where nik='"+this.cb_nik.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and '"+this.dp_d1.getDateString()+"' between tgl_mulai and tgl_selesai ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						system.alert(this,"Transaksi tidak valid.","Tanggal dalam range riwayat yang lain.");
						return false;
					}
					else this.simpan();
				}
				else this.simpan();
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
	doSelectDate: function(sender, d,m,y){
		if (sender == this.dp_d1){
			this.dp_d2.dateAdd('d',parseFloat(this.e_lama.getText()), this.dp_d1.toSysDate());			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.e_lama) this.doSelectDate(this.dp_d1);
			if (sender == this.cb_nik){
				if (this.cb_nik.getText() != "") {
					/*var strSQL = "select convert(varchar,tgl_mulai,103)  as tgl_awal,convert(varchar,tgl_selesai,103)  as tgl_akhir,keterangan,sts_sanksi,lama "+
								 "from gr_dinas "+
								 "where nik='"+this.cb_nik.getText()+"' and flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' order by tgl_mulai desc";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){						
						var line = data.rs.rows[0];							
						if (line != undefined){					
							this.cb_jabLama.setText(line.kode_so);
							this.e_tglLama.setText(line.tgl_mulai);							
						} 
						else {
							this.cb_jabLama.setText("-","-");
							this.e_tglLama.setText("-");
						}
					}*/
					this.doLoad();	
				}
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doLoad:function(sender){			
		var strSQL = "select a.no_sk,convert(varchar,a.tgl_input,103) as tanggal,convert(varchar,a.tgl_mulai,103) as tgl1,convert(varchar,a.tgl_selesai,103) as tgl2,a.lama,a.flag_aktif,a.keterangan,a.sts_sanksi+' | '+b.nama as sanksi,a.no_dok,convert(varchar,a.tgl_surat,103) as tgl_surat,a.gambar "+
					 "from gr_rwysanksi a "+
					 "		inner join gr_status_sanksi b on a.sts_sanksi=b.sts_sanksi and a.kode_lokasi=b.kode_lokasi "+
					 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by tgl_mulai desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "" && this.sg1.cells(7,row) != "0") {		
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				var strSQL = "select * from gr_rwysanksi "+
							 "where nik='"+this.cb_nik.getText()+"' and no_sk='"+ this.sg1.cells(6,row)+"' and kode_lokasi='"+this.app._lokasi+"' ";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){						
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_ket.setText(line.keterangan);	
						this.e_dok.setText(line.no_dok);							
						this.cb_sanksi.setText(line.sts_sanksi);							
						this.dp_d1.setText(line.tgl_mulai);							
						this.dp_d2.setText(line.tgl_selesai);							
						this.e_lama.setText(floatToNilai(line.lama));	
						this.no_sk = line.no_sk;				
						this.dp_d3.setText(line.tgl_surat);
						this.e_file.setText(line.gambar);
						this.fileBfr = line.gambar;				
					} 
				}											
			}
		} catch(e) {alert(e);}
	},
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.tanggal,line.sanksi,line.keterangan,line.lama,line.tgl1,line.tgl2,line.no_sk,line.flag_aktif,line.no_dok,line.tgl_surat,line.gambar]); 
		}
		this.sg1.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
