window.app_saku3_transaksi_ykap_pinj_fEditSawal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ykap_pinj_fEditSawal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_ykap_pinj_fEditSawal";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Ubah Schedule Pinjaman", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Data Kartu"]});			
		this.cb_agg = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,10,220,20],caption:"Anggota",tag:1, multiSelection:false, change:[this,"doChange"]});
		this.e_nb = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"No Kartu",maxLength:30,multiSelection:false, change:[this,"doChange"]});
		this.c_jenis = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Jenis Angsuran",tag:1,readOnly:true});
		this.cb_status = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Status Bayar",tag:1,readOnly:true});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,20,995,323], childPage:["Data Pinjaman","Schedule Angsuran"]});		
		this.cb_pinj = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Jenis Pinjaman",tag:1, readOnly:true});
		this.e_nilai = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,29,200,20],caption:"Nilai Pinjaman", tipeText:ttNilai, text:"0", readOnly:true});
		this.e_lama = new portalui_saiLabelEdit(this.pc2.childPage[0], {bound:[20,21,200,20],caption:"Lama Bayar",tipeText:ttNilai, text:"0", readOnly:true});
		this.e_bunga = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,31,200,20],caption:"Bunga(%) / Tahun",tipeText:ttNilai, text:"0", readOnly:true});
		this.e_bayar = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,37,200,20],caption:"Nilai Terbayar",tipeText:ttNilai, readOnly:true, text:"0"});
							
		//copy-paste
		this.sg = new saiGrid(this.pc2.childPage[1],{bound:[0,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:0,
				colTitle:["Saldo Awal","Pokok","Margin","Saldo Akhir","Tgl Tagih"],
				colWidth:[[4,3,2,1,0],[80,80,80,80,80]],
				columnReadOnly:[true,[0,1,2,3,4],[]],				
				colFormat:[[0,1,2,3,4],[cfNilai,cfNilai,cfNilai,cfNilai,cfDate]],
				pasteEnable:true,																
				defaultRow:1,autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[0,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg});
		this.i_del = new portalui_imageButton(this.sgn,{bound:[120,2,20,20],hint:"Delete All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doDel"]});						
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);		
		this.pc2.childPage[0].rearrangeChild(10, 23);		
				
		setTipeButton(tbSimpan);
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

			this.cb_agg.setSQL("select no_agg,nama from kop_agg where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",["no_agg","nama"],false,["Kode","Nama"],"and","Data Anggota",true);						
			this.cb_pinj.setSQL("select kode_param,nama from kop_pinj_param where kode_lokasi = '"+this.app._lokasi+"'",["kode_param","nama"],false,["Kode","Nama"],"and","Data Parameter",true);						
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_ykap_pinj_fEditSawal.extend(window.portalui_childForm);
window.app_saku3_transaksi_ykap_pinj_fEditSawal.implement({
	doDel: function() {
		this.sg.clear(1);
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();

				//ambil urutan resch ke berapa...
				var strSQL = "select isnull(max(resch_ke),0)+1 as resch_ke from kop_pinj_sch_his where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";											
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						var resch_ke = parseInt(line.resch_ke);
					}
				}
				//penampung sementara dulu....nanti dihapus
				sql.add("insert into kop_pinj_sch_his (resch_ke,no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill) "+
						"select "+resch_ke+",no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill "+
						"from kop_pinj_sch where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");


				sql.add("delete from kop_pinj_sch where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				sql.add("delete from kop_pinjangs_d where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
				
				var j = 0; 				  
				for (var i=0; i < this.sg.rows.getLength(); i++){
					j = i+1;					
					sql.add("insert into kop_pinj_sch(no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+j+","+nilaiToFloat(this.sg.cells(1,i))+","+nilaiToFloat(this.sg.cells(2,i))+","+nilaiToFloat(this.sg.cells(3,i))+",'"+this.sg.getCell(4,i).substr(6,4)+'/'+this.sg.getCell(4,i).substr(3,2)+'/'+this.sg.getCell(4,i).substr(0,2)+"','"+this.sg.getCell(4,i).substr(6,4)+this.sg.getCell(4,i).substr(3,2)+"','-')");
				}
				//update no_bill di sch baru dgn bill dari historis
				sql.add("update a set a.no_bill=b.no_bill "+
						"from kop_pinj_sch a inner join kop_pinj_sch_his b on a.no_pinj=b.no_pinj and a.periode=b.periode and a.kode_lokasi=b.kode_lokasi and b.resch_ke='"+resch_ke+"' "+
						"where a.no_pinj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

				//insert angsuran barunya
				sql.add("INSERT INTO kop_pinjangs_d (no_angs, no_pinj, no_bill, akun_piutang, akun_pjasa, npokok, nbunga, kode_lokasi, dc, periode, cicilan_ke, modul, no_agg) "+
						"select a.no_bill, a.no_pinj, a.no_bill, b.akun_piutang, b.akun_pjasa, a.npokok, a.nbunga, a.kode_lokasi, 'D', a.periode, a.cicilan_ke, 'PJTUNAI', b.no_agg "+
						"from kop_pinj_sch a inner join kop_pinj_m b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi "+
						"where a.no_pinj='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");	

				//delete historis penampungan		
				sql.add("delete from kop_pinj_sch_his where resch_ke="+resch_ke+" and no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");											

				setTipeButton(tbAllFalse);					
				this.dbLib.execArraySQL(sql);					
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
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :					
				this.simpan();
				break;											
		}
	},
	doChange: function(sender){
		try{	
			if (sender == this.cb_agg && this.cb_agg.getText()!="") {					
				this.e_nb.setSQL("select no_pinj,keterangan from kop_pinj_m where status_aktif='1' and no_agg='"+this.cb_agg.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",["no_pinj","keterangan"],false,["No Pinj","Deskrp"],"and","Data Pinjaman",true);						
			}
			if (sender == this.e_nb && this.e_nb.getText()!="") {					
				var strSQL = "select * from kop_pinj_m where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.c_jenis.setText(line.jenis_angs);
						this.cb_status.setText(line.status_bayar);						
						this.cb_pinj.setText(line.kode_param);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_lama.setText(floatToNilai(line.lama_bayar));
						this.e_bunga.setText(floatToNilai(line.p_bunga));
						this.e_bayar.setText("0");						

						var strSQL = "select saldo+npokok sawal, npokok, nbunga, saldo, convert(varchar,tgl_angs,103) as tgl "+
									 "from kop_pinj_sch "+ 
									 "where no_pinj = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
									 "order by cicilan_ke ";					
						var data2 = this.dbLib.getDataProvider(strSQL,true);														
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];										
								this.sg.appendData([floatToNilai(line2.sawal), floatToNilai(line2.npokok), floatToNilai(line2.nbunga), floatToNilai(line2.saldo), line2.tgl]);
							}
						} else this.sg.clear(1);

					}
				}
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
			this.sg.clear(1); 
			setTipeButton(tbSimpan);					
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);						
		} catch(e) {
			alert(e);
		}
	}
});