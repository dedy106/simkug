window.app_assetsap_transaksi_fArsip = function(owner)
{
	if (owner)
	{
		window.app_assetsap_transaksi_fArsip.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_transaksi_fArsip";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Arsip", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar;datePicker;saiGrid;sgNavigator;util_file;label");			
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 200, 20],
				caption: "No Arsip",
				multiSelection:false, 
				rightLabelVisible:false,
				sql:["select distinct no_arsip, nama, no_surat from amu_arsip where kode_lokasi = '"+this.app._lokasi+"' ", ["no_arsip", "nama","no_surat"], false, ["No Arsip","Nama","No Surat"], "and", "Daftar Arsip",false]
			});			
			this.bGen = new button(this,{bound:[230,10,80,20],caption:"Generate",click:"doClick"});		
			this.ed_ordner = new saiLabelEdit(this, {
				bound: [420, 10, 200, 20],
				caption: "No Ordner",
				readOnly:true
			});			
			this.ed_nama = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "Nama"
			});							
			
			
			this.ed_surat = new saiLabelEdit(this, {
				bound: [20, 3, 600, 20],
				caption: "No Surat"
			});			
			this.ed_lokfa = new saiCBBL(this,{
				bound:[20,33,200,20],
				caption:"Lokasi Aset",
				multiSelection:false, 
				change:[this,"doEditChange"],
				sql:["select kode_lokfa, alamat, kel, kec from amu_lokfa where kode_lokasi = '"+this.app._lokasi+"' ",["kode_Lokfa","alamat","kel","kec"], false, ["Kode Lokasi","Alamat","Kecamatan","Kelurahan"], "and","Daftar Lokasi Aset",true]
			});
			this.lbl1 = new label(this, {
				bound:[20,34,100,20], 
				caption:"Tanggal",
				underline:true
			});
			this.dp_tgl1 = new datePicker(this,{
				bound:[120,34,100,18]
			});
			this.lbl1 = new label(this, {
				bound:[230,34,100,20], 
				caption:"Tgl. Akhir Berlaku",
				underline:true
			});
			this.dp_tgl2 = new datePicker(this,{
				bound:[320,34,100,18]
			});
			this.ed_ket = new saiLabelEdit(this,{
				bound:[20,35,600,20],
				caption:"Keterangan"
			});
			this.ed_pnj = new saiCBBL(this, {
				bound:[20,36,200,20],
				caption:"Penanggung Jawa",
				multiSelection:false, 
				sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ",["nik","nama"], false, ["NIK","Nama"], "and", "Daftar Karyawan", true]
			});
			this.ed_fisik = new saiCBBL(this, {
				bound:[20,33,200,20],
				caption:"Status Fisik",
				multiSelection:false, 
				sql:["select kode_fisik, nama from amu_fisik where kode_lokasi = '"+this.app._lokasi+"' ",["kode_fisik","nama"], false, ["Kode Fisik","Nama"], "and", "Daftar Status Fisik", true]
			});				
			this.ed_jenis = new saiCBBL(this, {
				bound:[20,34,200,20],
				caption:"Jenis Arsip",
				multiSelection:false, 
				sql:["select kode_jenis, nama from amu_jenis where kode_lokasi = '"+this.app._lokasi+"' ",["kode_jenis","nama"], false, ["Kode Jenis","Nama"], "and", "Daftar Jenis Arsip", true]
			});				
			this.ed_reg = new saiLabelEdit(this,{
				bound:[20,37,600,20],
				caption:"No Register"
			});
			this.p1 = new panel(this,{
				bound:[20,38, 600,225],
				caption:"Data Detail Arsip"
			});
			this.sgUpld = new saiGrid(this.p1,{bound:[1,20,598,180],colCount:2,colTitle:["Dokumen","Upload"],colFormat:[[1],[cfUpload]],
					colWidth:[[1,0],[80,480]], readOnly:true, change:[this,"doGridChange"],rowCount:1,tag:9});
			this.sgUpld.setUploadParam([1],"uploadTo", "server/media/tmp/"+this.app._userLog+"_", "object","server/media/");
			this.sgn = new sgNavigator(this.p1,{bound:[1,this.p1.height - 25,598,25],buttonStyle:1, grid:this.sgUpld});
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);					
			
			this.ed_kode.onChange.set(this, "doEditChange");
			this.ed_kode.onBtnClick.set(this, "FindBtnClick");			
			
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.fileUtil.getRootDir();			
			this.separator = "/";
			this.rootDir = this.rootDir.substr(0,this.rootDir.search("server")-1);	
			
			this.onClose.set(this,"doClose");
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_transaksi_fArsip.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_transaksi_fArsip.implement({
	doClose: function(sender){		
		if (this.uploadedFiles !="" ) this.fileUtil.deleteFiles(this.uploadedFiles);
	},
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	doModalResult: function(event, modalResult){			
		try{					
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("insert into amu_arsip(no_arsip, no_surat, kode_lokfa, nama, tgl_awal, tgl_akhir, keterangan, kode_pnj, kode_fisik, no_reg, kode_lokasi, nik_user, tgl_input, kode_jenis)  values "+
									"('"+this.ed_kode.getText()+"','"+this.ed_surat.getText()+"','"+this.ed_lokfa.getText()+"','"+this.ed_nama.getText()+"', '"+this.dp_tgl1.getDateString()+"', '"+this.dp_tgl2.getText()+"','"+this.ed_ket.getText()+"','"+this.ed_pnj.getText()+"', '"+this.ed_fisik.getText()+"','"+this.ed_reg.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',now(), '"+this.ed_jenis.getText()+"')");
							var ix = 0;
							this.saveFiles = "", this.dest = "", first = true;
							var files = [];
							for (var i=0;i < this.sgUpld.getRowCount();i++){
								if (this.sgUpld.rowValid(i)){
									ix++;
									sql.add("insert into amu_arsip_dok(no_arsip, no_gambar, nu)values('"+this.ed_kode.getText()+"','"+this.sgUpld.cells(1,i).filedest+"','"+ix+"')");									
									if (!first) { 
										this.saveFiles += ";";
										this.dest += ";";
									}                               
									this.saveFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + this.sgUpld.cells(1,i).tmpfile;
									this.dest += this.rootDir+"/server/media/" + this.sgUpld.cells(1,i).filedest;
									first = false;                       
									files.push(this.sgUpld.cells(0,i));
								}
							}
							this.dbLib.execArraySQL(sql);							
					{
						this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						
							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("update amu_arsip set  "+
									"no_surat='"+this.ed_surat.getText()+"',kode_lokfa='"+this.ed_lokfa.getText()+"',nama='"+this.ed_nama.getText()+"', tgl_awal='"+this.dp_tgl1.getDateString()+"', tgl_akhir='"+this.dp_tgl2.getDateString()+"', "+
									"keterangan='"+this.ed_ket.getText()+"',kode_pnj='"+this.ed_pnj.getText()+"',kode_fisik='"+this.ed_fisik.getText()+"',no_reg='"+this.ed_reg.getText()+"' , nik_user='"+this.app._userLog+"',tgl_input = now() "+
									"where no_arsip = '"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							sql.add("delete from amu_arsip where no_arsip='"+this.ed_kode.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' ");
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}
			this.ed_kode.setFocus();
		}
		catch(e)
		{
			system.alert(this, e,"");
		}	
	},
	doEditChange: function(sender){
		if (sender == this.ed_lokfa){
			var data = this.dbLib.getDataProvider("select kode_rak from amu_rak where '"+sender.getText()+"' between awal and akhir order by kode_rak, awal",true);
			if (typeof data != "string"){
				if (data.rs.rows[0]){
					this.ed_ordner.setText(data.rs.rows[0].kode_rak);
				}else this.ed_ordner.setText('-');
			}		
			
		}
		if (sender == this.ed_kode) 
		{
			if (this.ed_kode.getText() != "")
			{
				try
				{
					uses("server_util_arrayMap");
					var sql = new server_util_arrayList({items:["select * "+
													"from amu_arsip "+
													"where no_arsip = '"+this.ed_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
													"select no_gambar, nu from amu_arsip_dok where no_arsip = '"+this.ed_kode.getText()+"'  "
												]});
							
					var data = this.dbLib.getMultiDataProvider(sql,true);
					if (typeof data != "string"){
						if  (data.result[0].rs.rows[0]) {
							var line = data.result[0].rs.rows[0];
							this.ed_nama.setText(line.nama);
							this.ed_surat.setText(line.no_surat);
							this.ed_lokfa.setText(line.kode_lokfa);
							this.ed_ket.setText(line.keterangan);
							this.dp_tgl1.setText(line.tgl_awal);
							this.dp_tgl2.setText(line.tgl_akhir);
							this.ed_pnj.setText(line.kode_pnj);
							this.ed_fisik.setText(line.kode_fisik);
							this.ed_reg.setText(line.no_reg);
							this.ed_jenis.setText(line.kode_jenis);
							this.sgUpld.clear();
							for (var i in data.result[1].rs.rows){
								line = data.result[1].rs.rows[i];
								this.sgUpld.appendData([line.no_gambar,{filedest:line.no_gambar, filename:line.no_gambar}]);
							}
							setTipeButton(tbUbahHapus);
						}else{	
							this.ed_nama.setText("");
							setTipeButton(tbSimpan);
						}
					}else{	
					  this.ed_nama.setText("");
					  setTipeButton(tbSimpan);
					}
				}catch(e){
					system.alert(this, e,"");
				}
			}
		} 
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_arsip','no_arsip',this.app._lokasi+"-",'0000000'));
	},
	FindBtnClick: function(sender, event){				
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
					  this.fileUtil.copyFilesTo(this.saveFiles, this.dest, true);					  
					}else
						 system.alert(this, result,"");
					break;
			}
		}else if (sender == this.fileUtil){
	        switch(methodName){
    	       case "copyFilesTo" : 
                   if (result.indexOf("error") != -1){
        	           systemAPI.alert(result);
                   }else{ 
						this.app._mainForm.pesan(2,"upload "+result);	
						system.alert(this,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
						this.standarLib.clearByTag(this, new Array("0","1"),this.ed_kode);		
						this.sgUpld.clear(1);
						showProgress("delete temporary...");
						if (this.saveFiles !="" ) this.fileUtil.deleteFiles(this.saveFiles);
    		       }
                break;
                case "deleteFiles" :
                    hideProgress("delete temporary...");
                break;
             }
        }
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.filedest);
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});
