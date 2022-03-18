window.app_saku3_transaksi_rtrw_tamu_fMasuk = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_rtrw_tamu_fMasuk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_rtrw_tamu_fMasuk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tamu Masuk", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.e_tgljam = new portalui_saiLabelEdit(this,{bound:[20,11,220,20],caption:"Tanggal-Jam",tag:2,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[245,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});

		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,24,220,20],caption:"No Tamu",maxLength:30,readOnly:true});
		
		this.lstatus = new portalui_label(this,{bound:[300,24,100,18],caption:"Jenis Tamu",underline:true});
		this.rb1 = new portalui_radioButton(this,{bound:[400,24,100,20],caption:"UMUM", change:[this,"doRadioSelected"]});
		this.rb2 = new portalui_radioButton(this,{bound:[500,24,100,20],caption:"DELIVERY",selected:true, change:[this,"doRadioSelected"]});				
		this.c_jenis= new saiCB(this,{bound:[520,33,200,20],caption:"Jenis",items:["UMUM","DELIVERI"], readOnly:true,tag:2,visible:false});						
		
		this.e_kartu = new portalui_saiLabelEdit(this,{bound:[20,26,220,20],caption:"No Kartu",tag:1,tipeText:ttNilai,text:"0"});
		this.c_alasan= new saiCB(this,{bound:[20,25,400,20],caption:"Keperluan",items:["BERTAMU","BELAJAR","PAKET","GOJEK","GRAB"], tag:2,mustCheck:false});				
		

		this.pc1 = new pageControl(this,{bound:[5,12,600,280], childPage:["Tujuan","Tujuan ++","Foto ID","ID Tamu"]});		
		this.cb_blok = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,220,20],caption:"Blok", multiSelection:false,rightLabelCaption:false,  maxLength:10, tag:1,change:[this,"doChange"]});							
		this.cb_nomor = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Nomor / Nama KK", multiSelection:false,rightLabelCaption:false,  maxLength:10, tag:1,change:[this,"doChange"]});							
		this.e_status = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,24,200,20],caption:"Status Huni",tag:1,readOnly:true});
		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,170],colCount:6,tag:0,
		            colTitle:["Status","Nama","Alias","JK","No HP","Keterangan"],					
					colWidth:[[5,4,3,2,1,0],[200,100,50,100,170,70]],
					colHide:[[3,4],[true,true]],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["DITUJU","IDLE"]})]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,270],colCount:2,tag:9,
					colTitle:["Blok","Nomor"],					
					colWidth:[[1,0],[100,100]],
					buttonStyle:[[0,1],[bsAuto,bsAuto]],
					readOnly:true,
					autoAppend:true,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		

		this.e_foto = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,400,20],caption:"File Foto",tag:9,readOnly:true});
		this.bFoto = new button(this.pc1.childPage[2],{bound:[440,11,80,18],caption:"Ambil Foto",click:[this,"doFoto"]});
		this.cnv = new control(this.pc1.childPage[2],{bound:[20,12,200,150]});
		this.cnv2 = new control(this.pc1.childPage[2],{bound:[240,12,200,150]});
		this.cnv.getCanvas().style.overflow = "hidden";
		this.cnv.setInnerHTML("<video  id='"+this.cnv.getFullId()+"_vid' style='width:200px;height:150px;' autoplay></video>");
		this.cnv2.setInnerHTML("<img id='"+this.cnv2.getFullId()+"_img'  style='width:200px;height:150px;' src=''></img>");

		this.videoElm = $(this.cnv.getFullId()+"_vid");
		this.imgElm = $(this.cnv2.getFullId()+"_img");

		this.e_idtamu = new portalui_saiLabelEdit(this.pc1.childPage[3],{bound:[20,21,220,20],caption:"ID Tamu",tag:9,maxLength:50});
		this.e_nama = new portalui_saiLabelEdit(this.pc1.childPage[3],{bound:[20,22,400,20],caption:"Nama",tag:9,maxLength:50});
		this.e_alamat = new portalui_saiLabelEdit(this.pc1.childPage[3],{bound:[20,23,400,20],caption:"Alamat",tag:9,maxLength:200});
		this.e_hp = new portalui_saiLabelEdit(this.pc1.childPage[3],{bound:[20,24,220,20],caption:"No HP",tag:9,maxLength:50});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();	

		try {
			var self = this;
			navigator.mediaDevices.getUserMedia({
				video: true
			  }).
      		then(function(stream){
				self.videoElm.srcObject = stream;
			  }).catch(function(){
				  alert("Failed Called Video");
			  });
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
				
			this.doClick();

			this.rb1.setSelected(true);		
			this.c_jenis.setText("UMUM");			
			this.rb2.setSelected(false);	
			
			this.cb_blok.setSQL("select blok, kode_pp from rt_blok where kode_lokasi='"+this.app._lokasi+"'",["blok","kode_pp"],false,["Blok","RT"],"and","Data Blok",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_rtrw_tamu_fMasuk.extend(window.childForm);
window.app_saku3_transaksi_rtrw_tamu_fMasuk.implement({
	doRadioSelected: function(sender,selected){                     
		if (this.rb1.isSelected()) this.c_jenis.setText("UMUM");
		if (this.rb2.isSelected()) this.c_jenis.setText("DELIVERY");		
	},
	doFoto: function(){
		try{
		const canvas = document.createElement('canvas');
			canvas.width = this.videoElm.videoWidth;
			canvas.height = this.videoElm.videoHeight;
			canvas.getContext('2d').drawImage(this.videoElm, 0, 0);
			// Other browsers will fall back to image/png
			this.imgElm.src = canvas.toDataURL('image/webp');
			this.e_foto.setText(canvas.toDataURL('image/webp'));
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rt_tamu_m","no_tamu",this.app._lokasi+"-IN"+this.e_periode.getText().substr(2,4)+".","000000"));						
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					sql.add("insert into rt_tamu_m (no_tamu,periode,jenis,kode_lokasi,tgljam_in,nik_user,no_kartu,id_tamu,nama,alamat,no_hp,foto,keperluan,no_keluar,tgljam_out) values  "+
							"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.c_jenis.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"',"+this.e_kartu.getText()+",'"+this.e_idtamu.getText()+"', '"+this.e_nama.getText()+"','"+this.e_alamat.getText()+"','"+this.e_hp.getText()+"',   '"+this.e_foto.getText()+"','"+this.c_alasan.getText()+"','-',getdate())");																								
	
					if (this.sg.getRowValidCount() > 0) {						
						for (var i=0;i < this.sg.getRowCount();i++){							
							if (this.sg.rowValid(i)){										
								if (this.sg.cells(0,i) == "DITUJU") {																		
									sql.add("insert into rt_tamu_d (nu,no_tamu,kode_lokasi,blok,nomor,nama) values "+
											"("+i+", '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_blok.getText()+"','"+this.cb_nomor.getText()+"','"+this.sg.cells(1,i)+"')");
								}		
							}
						}
					}		

					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){							
							if (this.sg1.rowValid(i)) {				
								var k = i+1000;											
								sql.add("insert into rt_tamu_d (nu,no_tamu,kode_lokasi,blok,nomor,nama) values "+
										"("+k+", '"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"','TAMBAH')");
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					this.doClick();
					setTipeButton(tbSimpan);
				break;
			case "simpan" :		
				this.sg.validasi();	
				var strSQL = "select no_kartu from rt_tamu_m "+
						     "where no_keluar ='-' and no_kartu ='"+this.e_kartu.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[strSQL]}),true);				
				if (typeof data == "object"){
					var line = data.result[0].rs.rows[0];							
					if (line != undefined){						
						system.alert(this,"Transaksi tidak valid.","No Kartu sedang dipakai.");
						return false;
					}
				}

				var diTuju = false;
				for (var i=0;i < this.sg.getRowCount();i++){
					if (this.sg.rowValid(i) && this.sg.cells(0,i) == "DITUJU") {															
						diTuju = true;
					}
				}																											

				if (!diTuju){
					system.alert(this,"Transaksi tidak valid.","Penghuni yang dituju belum terpilih.");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;						
		}
	},		
	doChange:function(sender){	
		if (sender == this.cb_blok && this.cb_blok.getText()!="") {
			this.cb_nomor.setSQL("select nomor, nama_kk from rt_rumah_m where blok='"+this.cb_blok.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["nomor","nama_kk"],false,["Nomor","Nama KK"],"and","Data Rumah",true);
		}
		if ((sender == this.cb_blok || this.cb_nomor) && this.cb_blok.getText()!="" && this.cb_nomor.getText()!="") {
			var data = this.dbLib.getDataProvider(
						"select a.*,b.jenis "+
						"from rt_rumah_d a inner join rt_rumah_m b on a.blok=b.blok and a.nomor=b.nomor and a.kode_lokasi=b.kode_lokasi and b.status='LUNAS' "+									
						"where a.flag_aktif='1' and a.blok = '"+this.cb_blok.getText()+"' and a.nomor='"+this.cb_nomor.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];												
					this.sg.appendData(["IDLE",line.nama,line.alias,line.jk,line.no_hp,line.keterangan]);
				}
				this.e_status.setText(line.jenis);
			} else this.sg.clear(1);
		}
	},
	doClick:function(sender){				
		var data = this.dbLib.getDataProvider("select getdate() as tgljam, substring(convert(varchar,getdate(),112) ,1,6) as periode ",true);
		if (typeof data == "object"){
			var line = data.rs.rows[0];							
			if (line != undefined){							
				this.e_tgljam.setText(line.tgljam);		
				this.e_periode.setText(line.periode);
			}
		}	
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rt_tamu_m","no_tamu",this.app._lokasi+"-IN"+this.e_periode.getText().substr(2,4)+".","000000"));						
		this.c_alasan.setFocus();						
	},		
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "IDLE") this.sg.cells(0,row,"DITUJU");
		else this.sg.cells(0,row,"IDLE");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								//this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;								
								this.pc1.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;										
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1); 
			setTipeButton(tbSimpan);					
			this.doClick();
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	}
});