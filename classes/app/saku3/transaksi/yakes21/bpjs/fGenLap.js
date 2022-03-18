window.app_saku3_transaksi_yakes21_bpjs_fGenLap = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes21_bpjs_fGenLap.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes21_bpjs_fGenLap";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Generate Data Utilisasi BPJS", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;pageControl");
		this.e_periode = new saiCB(this,{bound:[20,13,202,20],caption:"Periode",readOnly:true,tag:2,change:[this,"doChange"]});		
		this.bTampil = new portalui_button(this,{bound:[230,13,80,18],caption:"Generate",click:[this,"doGen"]});		
		this.e_bp = new saiLabelEdit(this,{bound:[20,14,200,20],caption:"Total BP", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.e_cc = new saiLabelEdit(this,{bound:[20,15,200,20],caption:"Total CC", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		

		this.pc1 = new pageControl(this,{bound:[20,20,500,340], childPage:["Data Lokasi"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:0,
				colTitle:["Lokasi","Nilai BP (TB)","Nilai CC (TB)"],
				colWidth:[[2,1,0],[100,100,100]],
				readOnly:true,
				colFormat:[[1,2],[cfNilai,cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPage1"]});

		this.rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();

			this.e_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from periode where periode > '201806' order by periode desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];													
					this.e_periode.addItem(i,line.periode);
				}
			} 

			this.e_periode.setText("");
			this.e_periode.setText(this.app._periode);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes21_bpjs_fGenLap.extend(window.childForm);
window.app_saku3_transaksi_yakes21_bpjs_fGenLap.implement({		
	doChange: function(sender) {
		if (sender == this.e_periode && this.e_periode.getText()!="") {
			var strSQL = "select x.kode_lokasi "+
						 ",sum(case x.jenis when 'BP' then nilai else 0 end) as nilai_bp "+
						 ",sum(case x.jenis when 'CC' then nilai else 0 end) as nilai_cc "+
						 "from "+ 
						 "( "+

						 "		select kode_lokasi,'BP' as jenis,sum(case dc when 'D' then nilai else -nilai end) as nilai "+
						 "		from gldt "+
						 "		where modul <> 'TTAPP' and periode ='"+this.e_periode.getText()+"' and kode_akun in ( "+
						 " 			'11050301','11050302','11050303','11050304' "+
						 "		) "+
						 "		group by kode_lokasi "+

						 "		union all "+
						 "		select kode_lokasi,'CC' as jenis,sum(case dc when 'D' then nilai else -nilai end) as nilai "+ 
						 "		from gldt "+
						 "		where modul <> 'TTAPP' and periode ='"+this.e_periode.getText()+"' and kode_akun in ( "+
						 " 			'61010201','61010202','61010203','61010204' "+
						 "		) "+
						 "		group by kode_lokasi "+

						 ")x "+
						 "group by x.kode_lokasi order by x.kode_lokasi ";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;					
				this.sg1.clear();
				var bp = cc = 0;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					bp += parseFloat(line.nilai_bp);
					cc += parseFloat(line.nilai_cc);
					this.sg1.appendData([line.kode_lokasi,floatToNilai(line.nilai_bp),floatToNilai(line.nilai_cc)]);
				}
			} else this.sg1.clear(1);	
			this.e_bp.setText(floatToNilai(bp));		
			this.e_cc.setText(floatToNilai(cc));		
		}
	},
	doGen: function() {						
		var sql = "call sp_bpjs_lap_periode ('"+this.e_periode.getText()+"')";
		this.dbLib.execQuerySync(sql);			
		
		uses("server_util_arrayList");
		var sql = new server_util_arrayList();		
		sql.add("delete from yk_bpjs_bpcc where periode ='"+this.e_periode.getText()+"'");
		for (var i=0;i < this.sg1.getRowCount();i++){			
			if (this.sg1.rowValid(i)){				
				sql.add("insert into yk_bpjs_bpcc (kode_lokasi,jenis,periode,nilai) values "+
						"('"+this.sg1.cells(0,i)+"','PEGAWAI','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(1,i))+")");						
				sql.add("insert into yk_bpjs_bpcc (kode_lokasi,jenis,periode,nilai) values "+
						"('"+this.sg1.cells(0,i)+"','PENSIUN','"+this.e_periode.getText()+"',"+nilaiToFloat(this.sg1.cells(2,i))+")");															
			}
		}		
		this.dbLib.execArraySQL(sql);		
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
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);		
					this.sg1.clear(1);							
				break;
			case "simpan" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"Proses generate telah selesai. ("+ this.e_periode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});