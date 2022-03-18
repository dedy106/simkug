window.app_saku3_transaksi_siaga_fSchBeban = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_fSchBeban.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_fSchBeban";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Kartu Beban", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kartu","Daftar Kartu"]});
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No Kartu","Vendor","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,450,100,100]],
					readOnly:true,colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad1"]});		
			
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Kartu",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});						
		this.l_tgl = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai Tagihan", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],date:new Date().getDateStr()});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,370], childPage:["Data Kartu","Schedule Beban"]});		
		this.cb_vendor = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Vendor",tag:1, multiSelection:false});		
		this.e_ket = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,21,500,20],caption:"Deskripsi", text:""});
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,200,20],caption:"Nilai Total", tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.e_lama = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,22,200,20],caption:"Lama Bayar",tipeText:ttNilai, text:"0", change:[this,"doChange"]});
		this.cb_beban = new saiCBBL(this.pc2.childPage[0],{bound:[20,11,220,20],caption:"Akun Beban", multiSelection:false, maxLength:10, tag:2});							
		this.cb_hutang = new saiCBBL(this.pc2.childPage[0],{bound:[20,12,220,20],caption:"Akun BMHD", multiSelection:false, maxLength:10, tag:2});							
		this.cb_pp = new saiCBBL(this.pc2.childPage[0],{bound:[20,13,220,20],caption:"PP/Unit", multiSelection:false, maxLength:10, tag:2});							
		
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:3,tag:0,
				colTitle:["Periode","Nilai Schedule","Flag Gen"],
				colWidth:[[2,1,0],[100,100,80]],
				columnReadOnly:[true,[0,2],[1]],				
				colFormat:[[1],[cfNilai]],		
				nilaiChange:[this,"doNilaiChange"],														
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);		
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try{			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			
			this.cb_vendor.setSQL("select kode_vendor,nama from vendor where  kode_lokasi = '"+this.app._lokasi+"'",["kode_vendor","nama"],false,["Kode","Nama"],"and","Data Vendor",true);									
			this.cb_beban.setSQL("select a.kode_akun, a.nama from masakun a  "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_hutang.setSQL("select a.kode_akun, a.nama from masakun a  "+
								"where a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);
			this.cb_pp.setSQL("select kode_pp,nama from pp where  flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);									
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_fSchBeban.extend(window.portalui_childForm);
window.app_saku3_transaksi_siaga_fSchBeban.implement({
	generateSch: function(){
	    try{         
            var lm = nilaiToFloat(this.e_lama.getText());
    		var so = nilaiToFloat(this.e_nilai.getText());
			
			var pokok = Math.round(so / lm);    		
			var tglNext = perAwal = this.dp_d1.getThnBln();			
			this.dataAngsuran = [];			
			this.sg.clear();			
			for (var i = 0;i < lm;i++){
				
				this.dataAngsuran.push([perAwal, floatToNilai(pokok), "-"]);
				so = so - pokok;
				if (so < pokok) pokok = so;

				else 
					if ( i == lm - 2) pokok = so; 
				
                perAwal = getNextPeriode(perAwal);
				this.sg.appendData(this.dataAngsuran[i]);
    		}
   		}catch(e){
           alert(e);
        }
	},
	
	doNilaiChange: function(){
		try{
			this.totSch = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(1,i) != ""){
					this.totSch += nilaiToFloat(this.sg.cells(1,i));					
				}
			}			
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from gr_kartu_m where no_kartu = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						
						//yg sudah pernah generate gak bisa diedit
						sql.add("delete from gr_kartu_sch where no_kartu = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_bill='-' ");
					}

					var thnBln = this.dp_d1.getDateString().substr(0,4) + this.dp_d1.getDateString().substr(5,2);					
					sql.add("insert into gr_kartu_m (no_kartu,keterangan,tanggal,periode,kode_vendor,nilai,lama_bayar,akun_beban,akun_hutang,nik_user,tgl_input,kode_lokasi, kode_pp) values "+
					        "('"+this.e_nb.getText()+"','"+this.e_ket.getText()+"','"+this.dp_d1.getDateString()+"','"+thnBln+"','"+this.cb_vendor.getText()+"',"+nilaiToFloat(this.e_nilai.getText())+","+nilaiToFloat(this.e_lama.getText())+",'"+this.cb_beban.getText()+"','"+this.cb_hutang.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"', '"+this.cb_pp.getText()+"')");
					
					var j = 0; 				  
					for (var i=0; i < this.sg.rows.getLength(); i++){					  			
						if (this.sg.cells(2,i) == "-") {	
							sql.add("insert into gr_kartu_sch(no_kartu,kode_lokasi,nu,nilai,periode,no_bill,no_rev,periode_rev) values "+
									"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+","+nilaiToFloat(this.sg.cells(1,i))+",'"+this.sg.cells(0,i)+"','-','-','-')");
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);							
				}
				break;
			
			case "simpan" :	
			case "ubah" :	
					this.sg.validasi();
					if (this.totSch != nilaiToFloat(this.e_nilai.getText())) {
						system.alert(this,"Transaksi tidak va;id.","Total Schedule dan Nilai Total tidak sama.");
						return false;
					}
					else this.simpan();
				break;
			
			case "hapus" :					
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				var strSQL = "select * "+
							 "from gr_kartu_sch "+							 
							 "where no_kartu = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_bill <>'-' ";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						system.alert(this,"Transaksi tidak dapat dihapus.","Data sudah pernah di generate.");
						return false;
					}
				}	

				sql.add("delete from gr_kartu_m where no_kartu = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from gr_kartu_sch where no_kartu = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);								
				break;				
		}
	},
	doChange: function(sender){
		try{						
			if (sender == this.cb_vendor && this.cb_vendor.getText()!=""&& this.stsSimpan == 1) this.e_nb.setText("");						

			if (sender == this.e_nilai || sender == this.e_lama) {
				if ( this.e_lama.getText() != "0" && this.e_nilai.getText() != "0" )   
					this.generateSch();	
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doClick:function(sender){
		try {			
			var thn = this.dp_d1.getDateString().substr(2,2);
			this.stsSimpan = 1;
			var thnBln = this.dp_d1.getDateString().substr(2,2) + this.dp_d1.getDateString().substr(5,2);
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_kartu_m","no_kartu",this.app._lokasi+"-AKB"+thnBln+".","0000"));		
		    this.dp_d1.setFocus();
			setTipeButton(tbSimpan);
		}
		catch (e) {
			alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								//this.nama_report="server_report_saku3_kb_rptKbJurnalBukti";
								//this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg1.clear(1); this.sg.clear(1); 
			setTipeButton(tbAllFalse);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.stsSimpan = 1;
		} catch(e) {
			alert(e);
		}
	},
	doLoad1:function(sender){																		
		if (this.cb_vendor.getText() == "") var filter = ""; else var filter = "a.kode_vendor = '"+this.cb_vendor.getText()+"' and ";		
		var strSQL = "select a.no_kartu,a.kode_vendor,a.keterangan,a.nilai "+
		             "from gr_kartu_m a "+					 					 					 
					 "where "+filter+" a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU1 = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData1(1);
		} else this.sg1.clear(1);			
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line.no_kartu,line.kode_vendor,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doDoubleClick1: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg1.cells(0,row));								
								
				var strSQL = "select * "+
							 "from gr_kartu_m "+							 
							 "where no_kartu = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.cb_vendor.setText(line.kode_vendor);
						this.dp_d1.setText(line.tanggal);
						
						this.e_nilai.setText(floatToNilai(line.nilai));						
						this.e_lama.setText(floatToNilai(line.lama_bayar));						
						this.cb_beban.setText(line.akun_beban);
						this.cb_hutang.setText(line.akun_hutang);
						this.cb_pp.setText(line.kode_pp);
						this.e_ket.setText(line.keterangan);
					}
				}	
				

				var data = this.dbLib.getDataProvider( 
							"select * from gr_kartu_sch where no_kartu='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData([line.periode,floatToNilai(line.nilai),line.no_bill]);
					}
				} else this.sg.clear(1);	

				
			}									
		} catch(e) {alert(e);}
	}
});